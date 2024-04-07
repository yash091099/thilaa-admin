import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getVendors = () => {
  const url = `${baseUrl}vendors`;
  return instance.get(url);
};

export const getVendorDetails=(id) => {
  const url = `${baseUrl}vendors/${id}`;
  return instance.get(url);
}

export const updateVendorDetails = (data) => {
  const url = `${baseUrl}vendors/${data?.id}`;
  return instance.post(url,{name: data?.name, email: data?.email, phone: data?.phone});
}

export const VerifyStore=(data) => {
  const url = `${baseUrl}approve-store`;
  return instance.post(url,data);
}