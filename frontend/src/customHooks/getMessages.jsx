import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";
import { serverUrl } from "../main.jsx";
import axios from "axios";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { userData, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData?._id || !selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/message/send/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.error("Message Fetch Error:", error.message);
        dispatch(setMessages([]));
      }
    };

    fetchMessages();
  }, [userData?._id, selectedUser?._id, dispatch]);
};

export default useGetMessages;
