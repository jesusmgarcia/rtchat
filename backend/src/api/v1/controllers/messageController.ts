import { Conversation } from 'db/models/conversation';
import { Message } from 'db/models/message';

export const SendMessage = async (req, res) => {
  try {
    const senderId = req.user;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

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
      message: 'Message sent successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.user;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages');

    res.status(200).json(conversation?.messages || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
