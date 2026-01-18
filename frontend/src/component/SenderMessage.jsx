import React from "react";
import img3d from "../assets/3d.png";

const SenderMessage = () => {
  return (
    <div className="flex justify-end">
      <div className="bg-[#20c7ff] text-white px-4 py-2 rounded-2xl shadow max-w-[80%] lg:max-w-[60%] gap-[10px] flex-col">
        <img
          src={img3d}
          alt="sent"
          className="w-[220px] max-w-full rounded-xl mb-2 object-cover"
        />

        <p className="text-sm">I’m good! What about you? 😊</p>

        <span className="text-[10px] text-white/80 block mt-1 text-right">
          10:31 AM
        </span>
      </div>
    </div>
  );
};

export default SenderMessage;
