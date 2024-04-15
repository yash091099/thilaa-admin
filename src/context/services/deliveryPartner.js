const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getDeliveryPartners = () => {
    const url = `${baseUrl}delivery-partners`;
    return instance.get(url);
}

export const getDeliveryPartnersDetails = (id) => {
    const url = `${baseUrl}delivery-partners/${id}`;
    return instance.get(url);
}

export const approveDeliveryPartnerProfile = (data) => {
    const url = `${baseUrl}approve-profile`;
    return instance.post(url,data);
}
export const approveDeliveryPartnerDocuments = (data) => {
    const url = `${baseUrl}approve-documents`;
    return instance.post(url,data);
}
export const  getDeliveriesByPartnerId = (id) => {
    const url = `${baseUrl}deliveries/${id}`;
    return instance.get(url);
}
export const  getEarningsByPartnerId = (id) => {
    const url = `${baseUrl}partner-earnings/${id}`;
    return instance.get(url);
}
export const  getWithdrawalsByPartnerId = (id) => {
    const url = `${baseUrl}partner-withdrawals/${id}`;
    return instance.get(url);
}
export const  approveDeliverPartnerWithdrawal = (data) => {
    const url = `${baseUrl}approve-withdrawal`;
    return instance.post(url,data);
}

