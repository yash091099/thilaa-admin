import React, { useState, useEffect } from "react";
import Table from "./paginated-Table";
import filterIcon from '../assets/svg/filter-icon.svg';
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../context/services/customer";
import {Loader} from './loader';
import { toast } from 'react-toastify';

export default function UserManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers()
      .then(response => {
        setCustomers(response.data.customers);
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

  if (!customers.length) {
    return null;
  }

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <div className="flex justify-between">
        <h1 className='text-text text-[1.5rem] font-[600]'>User Management</h1>
        <button className='flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]'>
          <img src={filterIcon} alt="filter"/>
          <p className="text-text text-[0.75rem] font-[600]">Filter</p>
        </button>
      </div>
      <Table data={customers} />
    </div>
  );
}
