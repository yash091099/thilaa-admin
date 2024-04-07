const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getCustomers = () => {
  const url = `${baseUrl}customers`;
  return instance.get(url);
};
export const getCustomersDetails = (data) => {
  const url = `${baseUrl}customers/${data}`;
  return instance.get(url);
};
export const updateCustomerDetails = (data) => {
  const url = `${baseUrl}customers/${data?.id}`;
  return instance.post(url,{name: data?.name, email: data?.email, phone: data?.phone});
};
