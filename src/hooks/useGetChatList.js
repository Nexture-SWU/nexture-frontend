import { useEffect, useState } from "react";
import { getChatList } from "../api/chat";

export function useGetChatList(user) {
  const [chatList, setChatList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const safeCall = async (fn, fallback = []) => {
      try {
        const result = await fn();
        console.log("[useGetChatList] API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useGetChatList] API 실패, fallback 사용:", e);
        return fallback;
      }
    };

    const fetchData = async () => {
      setLoading(true);
      const chats = await safeCall(() => getChatList());
      setChatList(chats["chats"]||[]);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  return {
    chatList,
    loading,
  };
}
