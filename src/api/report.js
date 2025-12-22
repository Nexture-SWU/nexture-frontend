import { fastapiApi } from "./client";

export async function creatFinalReport(chatId) {
 try {
    console.log("creatFinalReport 요청중")
    const response = await fastapiApi.post(`api/report/final/${chatId}`);    
    const data = response.data;
    console.log("creatFinalReport 성공:", data);
    return data;
  } catch (error) {
    console.warn('creatFinalReport 실패:', error.response || error);
    return null;
  }
}


export async function getFinalReport(chatId) {
 try {
    console.log("getFinalReport 요청중")
    const response = await fastapiApi.get(`api/report/final/${chatId}`);    
    const data = response.data;
    console.log("getFinalReport 성공:", data);
    return data;
  } catch (error) {
    console.warn('getFinalReport 실패:', error.response || error);
    return null;
  }
}

export async function getFinalReportList() {
 try {
    console.log("getFinalReportList 요청중")
    const response = await fastapiApi.get(`api/list/report/final`);    
    const data = response.data;
    console.log("getFinalReportList 성공:", data);
    return data;
  } catch (error) {
    console.warn('getFinalReportList 실패:', error.response || error);
    return null;
  }
}

export async function createTotalReport() {
 try {
    console.log("createTotalReport 요청중")
    const response = await fastapiApi.post(`api/report/total`);    
    const data = response.data;
    console.log("createTotalReport 성공:", data);
    return data;
  } catch (error) {
    console.warn('createTotalReport 실패:', error.response || error);
    return null;
  }
}


export async function getTotalReport() {
 try {
    console.log("getTotalReport 요청중")
    const response = await fastapiApi.get(`api/report/total`);    
    const data = response.data;
    console.log("getTotalReport 성공:", data);
    return data;
  } catch (error) {
    console.warn('getTotalReport 실패:', error.response || error);
    return null;
  }
}