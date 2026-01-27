import React, { useState } from "react";
import { IoArrowBackCircleSharp, IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import men from "../assets/3d.png";
import { setSelectedUser } from "../redux/userSlice.js";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import { setMessages } from "../redux/messageSlice.js";

import SenderMessage from "../component/SenderMessage";
import ReceiverMessage from "../component/ReceiverMessage";

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);

  // ✅ SEND MESSAGE
  const handleSendMessage = async () => {
    if (!message && !backendImage) return;
    if (!selectedUser?._id) return;

    try {
      const formData = new FormData();
      formData.append("message", message || "");
      if (backendImage) formData.append("image", backendImage);

      const res = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      // ✅ FIX: always treat messages as array
      dispatch(setMessages([...(messages || []), res.data]));

      setMessage("");
      setBackendImage(null);
      setFrontendImage(null);
    } catch (error) {
      console.error(
        "Send Message Error:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  // ✅ EMOJI HANDLER
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  // ✅ EMPTY STATE
  if (!selectedUser) {
    return (
      <div className="hidden lg:flex w-[70%] h-full flex-col justify-center items-center text-gray-600">
        <img src={men} alt="welcome" className="w-[300px] h-[300px]" />
        <h1 className="font-bold text-[40px]">Welcome to SayHi</h1>
        <span>Select a user to start chatting 💬</span>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[70%] h-screen bg-slate-100 flex flex-col">
      {/* HEADER */}
      <div className="w-full h-[70px] bg-[#20c7ff] flex items-center gap-3 px-4 shadow">
        <IoArrowBackCircleSharp
          onClick={() => dispatch(setSelectedUser(null))}
          className="w-9 h-9 text-white cursor-pointer lg:hidden"
        />
        <div className="w-11 h-11 rounded-full overflow-hidden bg-white">
          <img
            src={selectedUser.image || dp}
            className="w-full h-full object-cover"
            alt="profile"
          />
        </div>
        <div>
          <h2 className="text-white font-semibold">{selectedUser.name}</h2>
          <p className="text-xs text-white/80">Online</p>
        </div>
      </div>

      {/* ✅ MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-400">No messages yet</p>
        )}

        {messages.map((mess) => {
          const isSender =
            mess.sender?.toString() === userData?._id?.toString();

          return isSender ? (
            <SenderMessage
              key={mess._id}
              image={mess.image?.url || mess.image}
              message={mess.message}
            />
          ) : (
            <ReceiverMessage
              key={mess._id}
              image={mess.image?.url || mess.image}
              message={mess.message}
            />
          );
        })}
      </div>

      {/* IMAGE PREVIEW */}
      {frontendImage && (
        <div className="flex justify-end px-3 pb-2">
          <img
            src={frontendImage}
            className="max-w-[300px] max-h-[40vh] object-contain rounded-2xl border"
            alt="preview"
          />
        </div>
      )}

      {/* INPUT */}
      <div className="w-full h-[65px] bg-white flex items-center gap-3 px-4 shadow-inner relative">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setShowPicker(false);
          }}
          placeholder="Type a message..."
          className="flex-1 h-10 px-4 rounded-full border outline-none"
        />

        <BsEmojiSmile
          onClick={() => setShowPicker(!showPicker)}
          className="text-xl cursor-pointer text-gray-600"
        />

        {showPicker && (
          <div className="absolute bottom-16 right-10 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <label>
          <CiImageOn className="text-xl cursor-pointer text-gray-600" />
          <input type="file" hidden accept="image/*" onChange={handleImage} />
        </label>

        <button
          onClick={handleSendMessage}
          className="w-10 h-10 rounded-full bg-[#20c7ff] flex items-center justify-center text-white"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default MessageArea;
