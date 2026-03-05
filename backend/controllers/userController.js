import { User } from '../models/User.js';
import bcypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
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
      message: 'User registered successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
