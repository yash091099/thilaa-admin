import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getNotifications = () => {
  const url = `${baseUrl}notifications`;
  return instance.get(url);
};
