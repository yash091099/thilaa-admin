import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import acceptedIcon from '../assets/svg/accepted-orders.svg';
import rejectedIcon from '../assets/svg/rejected-orders.svg';
import productsIcon from '../assets/svg/products.svg';
import revenueIcon from '../assets/svg/revenue.svg';
import graph from '../assets/Graph1.svg';
import Table from './Table';
import ReportCard from './ReportCard';
import { Loader } from './loader';
import { toast } from 'react-toastify';
import { getDashboardData } from '../context/services/dashboard';
import LineGraph from './LineGraph';
export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDashboardData()
      .then(response => {
        setDashboardData(response.data);
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

  if (!dashboardData) {
    return null;
  }

  const { recent_customers, recent_vendors } = dashboardData;

  return (
    <div className='flex flex-col gap-[2rem]'>
      <div className='flex flex-col gap-[1.5rem] bg-white p-[2rem] rounded-[1rem] '>
        <h1 className='text-[1.5rem] font-[600]'>Admin Dashboard</h1>
        <div className='flex gap-[1.25rem]'>
          <DashboardCard image={acceptedIcon} value={dashboardData.orders.toString()} label="Total Orders" />
          <DashboardCard image={revenueIcon} value={dashboardData.revenue.toString()} label="Total Revenue" />
          <DashboardCard image={rejectedIcon} value={dashboardData?.customers?.toString()} label="Total Customers" />
          <DashboardCard image={productsIcon} value={dashboardData?.vendors?.toString()} label="Total Vendors" />
        </div>
      </div>
      <ReportCard label="Profit Report" value={`$ ${dashboardData.profit_report.reduce((a, b) => a + b, 0)}`} filterOptions={["October"]}>
        {/* <img className="w-full" src={graph} alt="img" /> */}
        <LineGraph data={dashboardData.profit_report} />

      </ReportCard>
      <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-md'>
        <div className="flex justify-between">
          <h1 className='text-text text-[1.5rem] font-[600]'>Recent Users</h1>
        </div>
        <Table data={recent_customers} customers={dashboardData.customers} />
      </div>
      <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-md'>
        <div className="flex justify-between">
          <h1 className='text-text text-[1.5rem] font-[600]'>Recent Vendors</h1>
        </div>
        <Table data={recent_vendors} vendors={dashboardData.vendors}/>
      </div>
    </div>
  )
}
