import { fastapiApi } from "./client";

export async function getBook(chatId) {
 try {
    console.log("getBook 요청중")
    const response = await fastapiApi.get(`api/book/${chatId}`);    
    const data = response.data;
    console.log("getBook 성공:", data);
    return data;
  } catch (error) {
    console.warn('getBook 실패:', error.response || error);
    return null;
  }
}
