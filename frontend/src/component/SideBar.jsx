import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { serverUrl } from "../main";
import axios from "axios";
import { setOtherUsers, setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { userData, otherUsers } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const confirm = window.confirm("Re you sure you want to loagout ?");
    if (!confirm) return;
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:w-[40%] w-full h-full bg-slate-200 font-serif">
      {/* LogOut Button */}
      <button
        onClick={() => handleLogOut()}
        className="w-12 h-12 rounded-full bg-[#20c7ff] hover:bg-blue-400 flex items-center justify-center shadow-lg shadow-gray-500 fixed bottom-[20px] left-[10px] "
      >
        <CiLogout className="w-5 h-5" />
      </button>

      <div className="w-full h-[250px] bg-[#20c7ff] rounded-b-[30%] shadow-lg shadow-gray-400 flex flex-col justify-center px-5">
        <h1 className="text-white font-bold text-3xl">SayHi</h1>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-semibold text-2xl">
            Hi, {userData?.name || "User"}
          </h1>

          <div
            onClick={() => navigate("/profile")}
            className="w-[60px] h-[60px] rounded-full overflow-hidden shadow-lg bg-white shadow-gray-500"
          >
            <img
              src={userData?.image || dp}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full flex  items-center gap-[20px]">
          {!search && (
            <button
              onClick={() => setSearch(true)}
              className="w-12 h-12 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center shadow-lg shadow-gray-500"
            >
              <IoIosSearch className="w-5 h-5" />
            </button>
          )}

          {/* Search Bar */}
          {search && (
            <form className="w-full h-10 bg-white flex items-center gap-2 px-3 rounded-full shadow-lg shadow-gray-500 overflow-hidden transition-all duration-300 ">
              <IoIosSearch className="w-4 h-4 text-gray-500 hover:bg-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full outline-none border-none"
              />

              <IoMdClose
                onClick={() => setSearch(false)}
                className="w-5 h-5 cursor-pointer text-gray-600"
              />
            </form>
          )}
          {!search &&
            otherUsers?.map((user) => (
              <div
                key={user._id || user.name}
                className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-gray-500 flex flex-row"
              >
                <img
                  src={user.image || dp}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="w-full h-[60vh] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]">
        {otherUsers?.map((user)=>(
          <div className="w-[95%] h-[50px] flex  items-center gap-[20px] bg-white shadow-gray-500 shadow-lg rounded-full hover:bg-slate-100">
        <div
          key={user._id || user.name}
          className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-gray-500 flex flex-row ml-[5px]"
        >
          <img
            src={user.image || dp}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-gray-800 font-semibold text-[18px] ">{user.name || user.userName}</h1>
        </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
