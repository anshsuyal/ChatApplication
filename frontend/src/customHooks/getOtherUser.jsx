import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { serverUrl } from "../main";

const getId = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (typeof val === "object" && typeof val._id === "string") return val._id;
  return null;
};

export default function GetOtherUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const myUserId = useMemo(() => getId(userData), [userData]);

  // Non-UI hook state: useful for debugging, and prevents silent failures.
  const [, setLoading] = useState(false);
  const [, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOtherUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!myUserId) {
          dispatch(setOtherUsers([]));
          return;
        }

        const result = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true,
          signal: controller.signal,
        });

        const list = Array.isArray(result.data) ? result.data : [];
        // Defensive: if API ever returns the current user, filter it out.
        const filtered = list.filter((u) => getId(u) !== myUserId);
        dispatch(setOtherUsers(filtered));
      } catch (error) {
        if (controller.signal.aborted) return;
        setError(error);
        console.log("Fetch Other Users Error:", error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchOtherUsers();
    return () => controller.abort();
  }, [myUserId, dispatch]);

  return null;
}