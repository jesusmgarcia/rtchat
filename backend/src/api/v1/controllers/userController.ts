import bcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from 'db/models/user';
import { srvConfig } from 'loaders/app';
import { Request, Response } from 'express';
import logger from 'utils/logger';
import { Types } from 'mongoose';
import { DefaultResponse } from '../types';

interface RegisterBody {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
}

type RegisterResponse = DefaultResponse;

export const register = async (
  req: Request<object, RegisterResponse, RegisterBody>,
  res: Response<RegisterResponse>
) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
      });
    }

    const hashedPassword = await bcypt.hash(password, 10);

    // profile photo
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === 'male' ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    logger.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  _id: Types.ObjectId;
  username: string;
  fullName: string;
  profilePhoto: string;
}

export const login = async (
  req: Request<object, LoginResponse | DefaultResponse, LoginBody>,
  res: Response<LoginResponse | DefaultResponse>
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const isMatch = await bcypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, srvConfig.jwtSecret, { expiresIn: '1d' });
    res
      .status(200)
      .cookie('token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    logger.error('Error logging in user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const logout = (_: Request, res: Response) => {
  try {
    res
      .status(200)
      .cookie('token', '', { maxAge: 0 })
      .json({ message: 'User logged out successfully' });
  } catch (error) {
    logger.error('Error logging out user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const getOtherUsers = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user;
    const users = await User.find({ _id: { $ne: currentUserId } }).select('-password');
    res.status(200).json(users);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
