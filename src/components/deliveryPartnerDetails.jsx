import React, { useState, useEffect } from "react";
import {Loader} from './loader';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import DeliveryDetailsTopBar from "./deliveryDetailsTopBar";
import DeliveryDetailsCardPast from "./deliveryDetailsCardsPast";
import DeliveryDetailsCard from "./deliveryDetailsCard";
import Pagination from '@mui/material/Pagination';
import { getDeliveriesByPartnerId,getDeliveryPartnersDetails,approveDeliveryPartnerProfile } from "../context/services/deliveryPartner";

const ToggleSwitch = ({ isActive, onToggle, disabled}) => (
  <label className="switch">
    <input type="checkbox"  disabled={disabled} checked={isActive} onChange={onToggle} />
    <span className="slider round"></span>
  </label>
);

export default function DeliveryPartnerDetails() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const [pastDeliveriesPage, setPastDeliveriesPage] = useState(1);
  const [transactionHistoryPage, setTransactionHistoryPage] = useState(1);
  const [user, setUser] = useState({});
  const [deliveriesData, setDeliveriesData] = React.useState([]);
  const [deliveryPartnerDetails, setDeliveryPartnerDetails] = React.useState({});
  const location = useLocation();

  useEffect(() => {
    const stateUser = location.state?.user;
    console.log(stateUser, 'stateUser');
    if (stateUser) {
      setUser({ ...user,...{name: stateUser.name, email: stateUser.email, phone: stateUser.phone,id : stateUser.id}});
    }
  }, [location.state?.user]);

  useEffect(() => {
    if(user?.id){
      setLoading(true);
      getDeliveriesByPartnerId(user?.id).then((response)=>{
        setDeliveriesData(response.data);
        console.log(response?.data ,'------------------ deliveries response');
      })
      fetchPartnerDetails();
    }
  },[user]);

  const fetchPartnerDetails = () => {
    getDeliveryPartnersDetails(user?.id).then((response)=>{
      console.log(response?.data ,'------------------ partner details response');
      setDeliveryPartnerDetails(response.data);
      setLoading(false);
    })
  };

  const handleToggleChange = async () => {
    setActive(!active);
    if (!active) {
      setLoading(true);
   const response=await   approveDeliveryPartnerProfile({user_id:user?.id});
      if(response.data?.status){
        toast.success("Profile approved successfully");
        fetchPartnerDetails();
        
      }else{
        toast.error(response.data?.message || "Failed to approve profile");

      }
      setLoading(false);
    }
  };

  const pastDeliveriesData = [];
  const transactionHistoryData = deliveriesData?.orders||[];

  const handlePastDeliveriesChange = (event, value) => {
    setPastDeliveriesPage(value);
  };

  const handleTransactionHistoryChange = (event, value) => {
    setTransactionHistoryPage(value);
  };

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      {loading && <Loader/>}
     <div className="flex justify-between items-center">
        <h1 className='text-text text-[1.5rem] font-[600]'>Delivery Partners</h1>
        <div>
          <span className="mr-2 ">Unverified</span>
          <ToggleSwitch isActive={deliveryPartnerDetails?.profile?.profile_status==='Verified'} disabled={deliveryPartnerDetails?.profile?.profile_status==='Verified'} onToggle={handleToggleChange} />
          <span className="ml-2 ">Verified</span>
        </div>
      </div>
      <DeliveryDetailsTopBar details={user}/>
      <div className="flex">
        <div className="w-1/2 p-4">
          <h1 style={{ fontFamily: 'Noto Sans', fontSize: '16px', fontWeight: '700', lineHeight: '22px', textAlign: 'left' }}>Past deliveries</h1>
          {pastDeliveriesData.slice((pastDeliveriesPage - 1) * 3, pastDeliveriesPage * 3).map(item => (
            <DeliveryDetailsCardPast key={item.id} title={item.title} />
          ))}
          {!pastDeliveriesData.length && <p style={{ fontFamily: 'Noto Sans', fontSize: '16px', fontWeight: '700', lineHeight: '22px', textAlign: 'center' }}>No past deliveries found</p>}
         {pastDeliveriesData.length ? <Pagination count={3} page={pastDeliveriesPage} onChange={handlePastDeliveriesChange} />:null}
        </div>
        <div className="w-1/2 p-4">
          <h1 style={{ fontFamily: 'Noto Sans', fontSize: '16px', fontWeight: '700', lineHeight: '22px', textAlign: 'left' }}>Transaction history</h1>
          {transactionHistoryData?.map(item => (
            <DeliveryDetailsCard  key={item.id} cardDetails={item} />
          ))}
          {!transactionHistoryData.length && <p style={{ fontFamily: 'Noto Sans', fontSize: '16px', fontWeight: '700', lineHeight: '22px', textAlign: 'center' }}>No transaction history found</p>}
          {transactionHistoryData.length ?  <Pagination
            count={Math.ceil(transactionHistoryData.length / 4)}
            page={transactionHistoryPage}
            onChange={handleTransactionHistoryChange}
          />:null}
        </div>
      </div>
    </div>
  );
}
