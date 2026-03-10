import { Conversation } from 'db/models/conversation';
import { Message } from 'db/models/message';
import { Request, Response } from 'express';
import { DefaultResponse } from '../types';

interface SendMessageBody {
  message: string;
}

interface SendMessageParams {
  id: string;
}

type SendMessageResponse = DefaultResponse;

export const SendMessage = async (
  req: Request<SendMessageParams, SendMessageResponse, SendMessageBody>,
  res: Response<SendMessageResponse>
) => {
  try {
    const senderId = req.user;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    gotConversation ??= await Conversation.create({
      participants: [senderId, receiverId],
    });

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await gotConversation.save();
    res.status(201).json({
      newMessage,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

interface GetMessageParams {
  id: string;
}

type GetMessageResponse = object[];

export const getMessage = async (
  req: Request<GetMessageParams, GetMessageResponse | DefaultResponse, object>,
  res: Response<GetMessageResponse | DefaultResponse>
) => {
  try {
    const senderId = req.user;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages');

    res.status(200).json(conversation?.messages ?? []);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
