import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { serverUrl } from "../main.jsx";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(
          "Get current user error:",
          error.response?.data || error.message
        );
      }
    };

    fetchUser();
  }, [dispatch]); // ✅ dispatch added
};

export default useGetCurrentUser;