import React, { useState, useEffect } from "react";
import Table from "./paginated-table-vendor";
import filterIcon from '../assets/svg/filter-icon.svg';
import { useNavigate } from "react-router-dom";
import {Loader} from './loader';
import { toast } from 'react-toastify';
import { getVendors } from "../context/services/vendor";

export default function UserManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    setLoading(true);
    getVendors()
      .then(response => {
        setVendors(response.data.vendors);
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

  if (!vendors.length) {
    return null;
  }

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <div className="flex justify-between">
        <h1 className='text-text text-[1.5rem] font-[600]'>Vendor Management</h1>
        {/* <button className='flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]'>
          <img src={filterIcon} alt="filter"/>
          <p className="text-text text-[0.75rem] font-[600]">Filter</p>
        </button> */}
      </div>
      <Table data={vendors} />
    </div>
  );
}
