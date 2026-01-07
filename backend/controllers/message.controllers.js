import uploadOnCloudinary from "../config/cloudinary";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image = null;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    // ✅ find conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    // ✅ create message
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    // ✅ create or update conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    return res.status(201).json(newMessage);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Send message error",
      error: error.message,
    });
  }
};
