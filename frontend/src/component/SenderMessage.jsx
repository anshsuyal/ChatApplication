import React from "react";

const SenderMessage = ({ image, message, time }) => {
  return (
    <div className="flex justify-end mb-2 px-2">
      <div
        className="bg-[#20c7ff] text-white px-3 py-2 rounded-2xl shadow
                   max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]
                   flex flex-col gap-2"
      >
        {/* IMAGE */}
        {image && (
          <img
            src={image}
            alt="sent"
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
        <span className="text-[10px] text-white/80 text-right">
          {time || ""}
        </span>
      </div>
    </div>
  );
};

export default SenderMessage;
