import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import dp from '../assets/dp.jpg'; // Adjust path if your default image is located elsewhere

const SenderMessage = ({ message, image }) => {
    // Get current user data to display their profile picture
    const { userData } = useSelector((state) => state.user);
    const scroll = useRef();

    // Auto-scroll to this message when it mounts/updates
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message, image]);

    // Handle scroll specifically for when an attached image finishes loading
    const handleImageScroll = () => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div ref={scroll} className="flex justify-end w-full mt-2">
            <div className="flex gap-2 max-w-[80%] sm:max-w-[600px] items-start">
                
                {/* Message Content Bubble */}
                <div className="flex flex-col items-end gap-2">
                    
                    {/* If an image attachment exists */}
                    {image && (
                        <img 
                            src={image.secure_url || image} 
                            alt="attachment" 
                            className="w-[150px] sm:w-[200px] rounded-lg shadow-md object-cover"
                            onLoad={handleImageScroll} // Crucial for scrolling after image load
                        />
                    )}
                    
                    {/* If a text message exists */}
                    {message && (
                        <div className="bg-slate-600 text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-md w-fit">
                            <span className="text-md break-words">{message}</span>
                        </div>
                    )}
                </div>

                {/* Sender Profile Picture */}
                <div className="w-[40px] h-[40px] shrink-0 mt-1">
                    <img 
                        src={userData?.image || dp} 
                        alt="sender profile" 
                        className="w-full h-full rounded-full object-cover shadow-sm border border-gray-300"
                    />
                </div>
                
            </div>
        </div>
    );
};

export default SenderMessage;