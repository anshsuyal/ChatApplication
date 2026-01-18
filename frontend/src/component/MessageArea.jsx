import React, { useState } from "react";
import { IoArrowBackCircleSharp, IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import men from "../assets/3d.png";
import { setSelectedUser } from "../redux/userSlice.js";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage.jsx"
import ReceiverMessage from "./ReceiverMessage.jsx"

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");

  // Emoji handler
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  // Empty state (desktop only)
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

      {/* Header */}
      <div className="w-full h-[70px] lg:h-[90px] bg-[#20c7ff] flex items-center gap-3 px-4 lg:px-6 shadow-lg sticky top-0 z-50">
        <IoArrowBackCircleSharp
          onClick={() => dispatch(setSelectedUser(null))}
          className="w-9 h-9 text-white cursor-pointer lg:hidden"
        />

        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full overflow-hidden bg-white shadow">
          <img
            src={selectedUser.image || dp}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-white font-semibold text-base lg:text-lg">
            {selectedUser.name || "User"}
          </h2>
          <p className="text-xs lg:text-sm text-white/80">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 lg:px-6 py-4 space-y-4">
{/* 
          
       <SenderMessage/>
     
       <ReceiverMessage/>
    */}
       
      

      </div>

      {/* Input */}
      <div className="w-full h-[65px] bg-white flex items-center gap-3 px-3 lg:px-6 shadow-inner sticky bottom-0">

        <input
          type="text"
          value={message}
          onChange={(e) => {setMessage(e.target.value);
            setShowPicker(false);
          }}
          placeholder="Type a message..."
          className="flex-1 h-10 px-4 rounded-full border outline-none text-sm
                     focus:ring-2 focus:ring-[#20c7ff]"
        />

        {/* Emoji Picker */}
        <div className="relative">
          <BsEmojiSmile
            onClick={() => setShowPicker((prev) => !prev)}
            className="text-xl cursor-pointer text-gray-600"
          />

          {showPicker && (
            <div className="fixed lg:absolute bottom-14 right-0 ">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <CiImageOn className="text-xl cursor-pointer text-gray-600" />

        <button
          className="w-10 h-10 rounded-full bg-[#20c7ff] flex items-center justify-center
                     text-white hover:bg-blue-500 active:scale-95 transition"
        >
          <IoSend />
        </button>

      </div>
    </div>
  );
};

export default MessageArea;
