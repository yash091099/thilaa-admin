import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const updatePassword = (data) => {
  const url = `${baseUrl}update-password`;
  return instance.post(url,data);
};
