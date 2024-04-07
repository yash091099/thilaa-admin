import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getReports = () => {
  const url = `${baseUrl}reports/2024`;
  return instance.get(url);
};
