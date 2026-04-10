import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.receiver;
    const { message } = req.body;

    if (!sender || !receiver) {
      return res.status(400).json({ message: "Missing sender/receiver" });
    }

    let image = "";
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    });

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      if (!Array.isArray(conversation.messages)) conversation.messages = [];
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = getReceiverSocketId(receiver)

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return res.status(201).json(newMessage);

  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({
      message: `Send message error: ${error.message}` 
    });
  }
};


export const getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.receiver;

    if (!sender || !receiver) {
      return res.status(400).json({ message: "Missing IDs" });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]); // ✅ important
    }

    return res.status(200).json(conversation.messages);

  } catch (error) {
    console.error("Get message error:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};