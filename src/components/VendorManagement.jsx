import React, { useState, useEffect } from "react";
import Table from "./paginated-table-vendor";
import filterIcon from '../assets/svg/filter-icon.svg';
import { useNavigate } from "react-router-dom";
import { Loader } from './loader';
import { toast } from 'react-toastify';
import { getVendors } from "../context/services/vendor";

export default function UserManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    getVendors()
      .then(response => {
        setVendors(response.data.vendors);
        setFilteredVendors(response.data.vendors);
        setLoading(false);
      })
      .catch(error => {
        toast.error("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  function handleSearch() {
    if (!searchTerm.trim()) {
      toast.error("Search field cannot be empty");
      return;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(lowercasedTerm) ||
      vendor.email.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredVendors(filtered);
    setFilterModalOpen(false);
  }

  function resetFilters() {
    setFilteredVendors(vendors);
    setSearchTerm('');
  }

  if (loading) {
    return <Loader />;
  }

  if (!filteredVendors.length) {
    return <div>No vendors found matching the search criteria.</div>;
  }

  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
      <div className="flex justify-between">
        <h1 className='text-text text-[1.5rem] font-[600]'>Vendor Management</h1>
        <div className="flex gap-[0.5rem]">
          {filteredVendors.length !== vendors.length && (
            <button onClick={resetFilters} className='border border-[#FF0000] px-[1rem] py-[0.5rem] rounded-[0.5rem]'>Reset</button>
          )}
          <button onClick={() => setFilterModalOpen(true)} className='flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]'>
            <img src={filterIcon} alt="filter"/>
            <p className="text-text text-[0.75rem] font-[600]">Filter</p>
          </button>
        </div>
      </div>
      <Table data={filteredVendors} />
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
          <div className="bg-white p-[2rem] rounded-[1rem]">
            <h2 className="text-text font-[600] mb-[1rem]">Filter Vendors</h2>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-[0.5rem] rounded-[0.5rem] w-full" placeholder="Search by name or email"/>
            <div className="mt-[1rem] flex justify-end gap-[0.5rem]">
              <button onClick={() => setFilterModalOpen(false)} className="px-[1rem] py-[0.5rem] rounded-[0.5rem] border border-[#CCCCCC]">Close</button>
              <button onClick={handleSearch} className="px-[1rem] py-[0.5rem] rounded-[0.5rem] border border-[#89BF2C]">Search</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
