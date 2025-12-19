import { useEffect, useState, useCallback } from "react";
import { creatReflection, getReflection } from "../api/reflection";
import { getBook } from "../api/reading";
import { creatFinalReport } from "../api/report";
import { useNavigateWithScrollTop } from './useNavigateWithScrollTop';

export function useReflection(chatId) {
  const navigate = useNavigateWithScrollTop();
  
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});
  const [reflection, setReflection] = useState(null);
  const [error, setError] = useState(null);

  const safeCall = async (fn, fallback = []) => {
      try {
        const result = await fn();
        console.log("[useReflection] API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useReflection] API 실패, fallback 사용:", e);
        return fallback;
      }
    };

  useEffect(() => {
    if (!chatId) {
      setLoading(false);
      return;
    }

    const fetchReflection = async () => {
      try {
        setLoading(true);
        const data = await safeCall(() =>getReflection(chatId));
        const book = await safeCall(() => getBook(chatId));
        setBook(book || {});
        setReflection(data["book_report"] || null);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReflection();

    return () => {};
  }, [chatId]);

  // 감상문 생성(POST)
  const createReflectionSafe = useCallback(
    async (reflectionData) => {
      try {
        setLoading(true);
        const data = await creatReflection(chatId, reflectionData);
        if (data) {
          setReflection(data);
        }
        return data;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [chatId]
  );

  // 보고서 생성(POST)
  const createFinalReportSafe = useCallback(
    async () => {
      try {
        setLoading(true);
        const data = await creatFinalReport(chatId);

        if (data) {
          navigate(`/learning/report/${chatId}`);
        }

        return null;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [chatId]
  );

  return {
    loading,
    book,
    reflection, // 없으면 null
    error,              
    createReflection: createReflectionSafe,
    createFinalReport: createFinalReportSafe,
  };
}

