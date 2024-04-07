// services/login.js
import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getDashboardData = () => {
  const url = `${baseUrl}dashboard/2024`;
  return instance.get(url);
};
