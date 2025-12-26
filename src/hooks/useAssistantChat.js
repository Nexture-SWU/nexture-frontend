import { sendAssistantMessage } from "../api/chat";

export function useAssistantChat(chatId) {
    const sendUserMessage = async (message) => {
        const safeCall = async (fn, fallback = null) => {
          try {
            const result = await fn();
            console.log("[useChat] sendMessage API 성공:", result);
            return result;
          } catch (e) {
            console.warn("[useChat] sendMessage API 실패, fallback 사용:", e);
            return fallback;
          }
        };
    
        const response = await safeCall(() => sendAssistantMessage(chatId, message));
        return response['reply'];
      }

    return {
        sendUserMessage
    }
}
