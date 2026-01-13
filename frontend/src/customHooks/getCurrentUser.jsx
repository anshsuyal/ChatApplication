import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          {
            withCredentials: true,
          }
        );
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("401 Unauthorized");
      }
    };

    fetchUser();
  }, []); 
};

export default useGetCurrentUser
