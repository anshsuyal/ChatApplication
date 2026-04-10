import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { serverUrl } from "../main";
import axios from "axios";
import {
  setOtherUsers,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { userData, otherUsers, selectedUser, onlineUsers } = useSelector(
    (state) => state.user
  );

  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (!isConfirmed) return;

    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full lg:w-[40%] h-full bg-slate-100 font-serif
      ${selectedUser ? "hidden lg:block" : "block"}`}
    >
      {/* Logout Button */}
      <button
        onClick={handleLogOut}
        className="w-12 h-12 rounded-full bg-[#20c7ff] hover:bg-blue-400 flex items-center justify-center shadow-lg fixed bottom-[20px] left-[10px]"
      >
        <CiLogout className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="w-full h-[250px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex flex-col justify-center px-5">
        <h1 className="text-white font-bold text-3xl">SayHi</h1>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-semibold text-2xl">
            Hi, {userData?.name || "User"}
          </h1>

          <div
            onClick={() => navigate("/profile")}
            className="w-[60px] h-[60px] rounded-full overflow-hidden shadow-lg bg-white cursor-pointer"
          >
            <img
              src={userData?.image || dp}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search */}
        <div className="w-full flex items-center gap-[20px]">
          {!search && (
            <button
              onClick={() => setSearch(true)}
              className="w-12 h-12 rounded-full bg-white hover:bg-blue-300 flex items-center justify-center shadow-lg"
            >
              <IoIosSearch className="w-5 h-5" />
            </button>
          )}

          {search && (
            <div className="w-full h-10 bg-white flex items-center gap-2 px-3 rounded-full shadow-lg">
              <IoIosSearch className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full outline-none"
              />
              <IoMdClose
                onClick={() => setSearch(false)}
                className="w-5 h-5 cursor-pointer text-gray-600"
              />
            </div>
          )}
        </div>
      </div>

      {/* User List */}
      <div className="w-full h-[60vh] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]">
        {otherUsers?.map((user) => {
          const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);
          return (
          <div
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="w-[95%] h-[50px] flex items-center gap-[20px] bg-white shadow-lg rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg ml-[5px] relative">
              <img
                src={user.image || dp}
                alt="profile"
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  isOnline ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            </div>
            <h1 className="text-gray-800 font-semibold text-[18px]">
              {user.name || user.userName}
            </h1>
          </div>
        )})}
      </div>
    </div>
  );
};

export default SideBar;
