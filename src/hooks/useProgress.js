import { useEffect, useState } from "react";
import { creatChatId, getChatList } from "../api/chat";
import { getFinalReportList, createTotalReport } from "../api/report";
import { getCurriculumList } from "../api/curriculum";

export function useProgress(user) {
  const [chatList, setChatList] = useState([]);
  const [curriculumList, setCurriculumList] = useState([]);
  const [finalReportList, setFinalReportList] = useState([]);
  const [totalReport, setTotalReport] = useState("")

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const safeCall = async (fn, fallback = []) => {
      try {
        const result = await fn();
        console.log("[useProgress] API 성공:", result);
        return result;
      } catch (e) {
        console.warn("[useProgress] API 실패, fallback 사용:", e);
        return fallback;
      }
    };

    const fetchData = async () => {
      setLoading(true);

      const chats = await safeCall(() => getChatList());
      const curriculums = await safeCall(() => getCurriculumList());
      const finalReports = await safeCall(() => getFinalReportList());
      const totalReportTmp = await safeCall(() => createTotalReport());

      setChatList(chats["chats"]||[]);
      setCurriculumList(curriculums["curriculums"]||[]);
      setFinalReportList(finalReports["final_reports"]||[]);
      setTotalReport(totalReportTmp["total_report"]||"")

      let tmp = chats["chats"]||[]
      if (tmp.length === 0) {
        await safeCall(() =>creatChatId())
        const newChats = await safeCall(() => getChatList());
        setChatList(newChats["chats"]||[]);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  return {
    chatList,
    curriculumList,
    finalReportList,
    totalReport,
    loading,
  };
}
