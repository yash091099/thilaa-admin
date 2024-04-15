import React, { useState, useEffect } from "react";
import Table from "./delivery-paginated-Table";
import filterIcon from '../assets/svg/filter-icon.svg';
import { useNavigate } from "react-router-dom";
import {Loader} from './loader';
import { toast } from 'react-toastify';
import { getDeliveryPartners } from "../context/services/deliveryPartner";

export default function Delivery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliveryPartners, setDeliveryPartners] = useState([]);

  useEffect(() => {
    setLoading(true);
    getDeliveryPartners()
      .then(response => {
        setDeliveryPartners(response.data.partners);
        setLoading(false);
      })
      .catch(error => {
        toast.error("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }


  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <div className="flex justify-between">
        <h1 className='text-text text-[1.5rem] font-[600]'>Delivery Partners</h1>
      
      </div>
      <Table data={deliveryPartners} />
    </div>
  );
}
