// services/login.js
import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';

export const loginAdmin = (data) => {
  return httpEncap.post(baseUrl + 'login', data);
};