import { useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { serverUrl } from "../main";

function getId(val) {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (typeof val === "object" && typeof val._id === "string") return val._id;
  return null;
}

function getMessageKey(msg) {
  // Prefer backend id if present; fallback to a composite key.
  const id = getId(msg?._id);
  if (id) return `id:${id}`;
  const sender = getId(msg?.sender) ?? "";
  const receiver = getId(msg?.receiver) ?? "";
  const createdAt = msg?.createdAt ?? msg?.updatedAt ?? "";
  const text = msg?.message ?? "";
  const image = msg?.image ?? "";
  return `c:${sender}|${receiver}|${createdAt}|${text}|${image}`;
}

function appendUnique(prev, incoming) {
  const key = getMessageKey(incoming);
  if (!key) return prev;
  if (prev.some((m) => getMessageKey(m) === key)) return prev;
  return [...prev, incoming];
}

export default function GetMessages() {
  const dispatch = useDispatch();
  const { selectedUser, userData, socket } = useSelector((state) => state.user);
  const messages = useSelector((state) => state.message.messages);
  const normalizedMessages = useMemo(
    () => (Array.isArray(messages) ? messages : []),
    [messages]
  );

  const selectedUserId = useMemo(() => getId(selectedUser), [selectedUser]);
  const myUserId = useMemo(() => getId(userData), [userData]);

  const messagesRef = useRef(normalizedMessages);
  useEffect(() => {
    messagesRef.current = normalizedMessages;
  }, [normalizedMessages]);

  // Fetch conversation messages when selected user changes.
  useEffect(() => {
    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        if (!selectedUserId) {
          dispatch(setMessages([]));
          return;
        }

        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUserId}`, {
          withCredentials: true,
          signal: controller.signal,
        });

        const list = Array.isArray(result.data) ? result.data : [];
        dispatch(setMessages(list));
      } catch (error) {
        // Ignore cancellations; log real errors.
        if (controller.signal.aborted) return;
        console.log("Fetch Messages Error:", error);
      }
    };

    fetchMessages();
    return () => controller.abort();
  }, [selectedUserId, dispatch]);

  // Real-time: attach a single listener with cleanup + dedupe + conversation filtering.
  useEffect(() => {
    if (!socket) return;
    if (!selectedUserId || !myUserId) return;

    const onNewMessage = (newMessage) => {
      const senderId = getId(newMessage?.sender);
      const receiverId = getId(newMessage?.receiver);

      // Only update the currently open conversation.
      const belongsToOpenChat =
        (senderId === myUserId && receiverId === selectedUserId) ||
        (senderId === selectedUserId && receiverId === myUserId) ||
        // Fallback for backends that omit receiver but include a conversationId:
        // if this message is from/to selected user, still accept.
        (senderId === selectedUserId || senderId === myUserId);

      if (!belongsToOpenChat) return;

      const next = appendUnique(messagesRef.current || [], newMessage);
      if (next !== messagesRef.current) {
        messagesRef.current = next;
        dispatch(setMessages(next));
      }
    };

    socket.off("newMessage", onNewMessage);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [socket, selectedUserId, myUserId, dispatch]);

  return null;
}