import { useEffect, useState, useCallback } from "react";
import { creatReflection, getReflection } from "../api/reflection";

export function useReflection(chatId) {
  const [loading, setLoading] = useState(true);
  const [reflection, setReflection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatId) {
      setLoading(false);
      return;
    }

    let isMounted = true; // 언마운트 안전장치

    const fetchReflection = async () => {
      try {
        setLoading(true);
        const data = await getReflection(chatId);

        // data가 null이거나 에러여도 그대로 처리
        if (isMounted) {
          setReflection(data ?? null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setReflection(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReflection();

    return () => {
      isMounted = false;
    };
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

  return {
    loading,
    reflection, // 없으면 null
    error,              
    createReflection: createReflectionSafe,
  };
}

