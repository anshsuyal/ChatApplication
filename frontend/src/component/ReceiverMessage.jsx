import React from "react";

const ReceiverMessage = ({ image, message, time }) => {
  return (
    <div className="flex justify-start mb-2 px-2">
      <div
        className="bg-white text-gray-800 px-3 py-2 rounded-2xl shadow 
                   max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] 
                   flex flex-col gap-2"
      >
        {/* IMAGE */}
        {image && (
          <img
            src={image}
            alt="received"
            className="w-full max-h-[40vh] object-contain rounded-xl"
          />
        )}

        {/* MESSAGE */}
        {message && (
          <p className="text-sm leading-relaxed break-words">
            {message}
          </p>
        )}

        {/* TIME */}
        <span className="text-[10px] text-gray-400 text-left">
          {time || "10:30 AM"}
        </span>
      </div>
    </div>
  );
};

export default ReceiverMessage
