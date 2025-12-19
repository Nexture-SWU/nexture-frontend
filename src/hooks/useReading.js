import { useEffect, useState } from "react";
import { getBook } from "../api/reading";

export function useReading(chatId) {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) return;

    const safeCall = async (fn, fallback = []) => {
      try {
        const result = await fn();
        console.log("[useReading] API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useReading] API 실패, fallback 사용:", e);
        return fallback;
      }
    };

    const fetchData = async () => {
      setLoading(true);

      const book = await safeCall(() => getBook(chatId));

      setBook(book||{});

      setLoading(false);
    };

    fetchData();
  }, [chatId]);

  return {
    book,
    loading,
  };
}
