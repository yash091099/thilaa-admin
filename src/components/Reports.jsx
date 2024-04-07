import React, { useEffect, useState } from 'react';
import ReportCard from './ReportCard';
import { getReports } from '../context/services/report';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { Loader } from './loader';
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Reports() {
    const [loading,setLoading] = useState(false);
    const [reports, setReports] = useState({
        customers_by_year: [],
        vendors_by_year: [],
        revenue_by_year: [],
        orders_by_year: []
    });
    const [showCustomers, setShowCustomers] = useState(true);
    const [showVendors, setShowVendors] = useState(true);
    const [showRevenue, setShowRevenue] = useState(true);
    const [showOrders, setShowOrders] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            const response = await getReports();

                setReports(response.data);
            
            setLoading(false);
        };
        fetchReports();
    }, []);

    const data = monthNames.map((month, index) => ({
        month,
        Customers: reports.customers_by_year[index] || 0,
        Vendors: reports.vendors_by_year[index] || 0,
        Revenue: reports.revenue_by_year[index] || 0,
        Orders: reports.orders_by_year[index] || 0
    }));

    return (
        <div className='flex flex-col gap-[2rem] mx-[1rem]'>
            {loading&&<Loader/>}
            <div className='bg-white rounded-[1rem] w-full'>
                <h1 className='text-[1.5rem] font-[600] px-[2rem] pt-[2rem]'>Analytics & Reports</h1>
                <ReportCard label="Customer and Vendor Statistics" darkHeading={true} value={`Customers: ${reports.customers_by_year.reduce((a, b) => a + b, 0)}, Vendors: ${reports.vendors_by_year.reduce((a, b) => a + b, 0)}`} filterOptions={["Today"]} onClick={() => { setShowCustomers(!showCustomers); setShowVendors(!showVendors); }}>
                    <LineChart width={1000} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {showCustomers && <Line type="monotone" dataKey="Customers" stroke="#BCE8B1" strokeWidth={4} />}
                        {showVendors && <Line type="monotone" dataKey="Vendors" stroke="#A8B6FF" strokeWidth={4} />}
                    </LineChart>
                </ReportCard>
            </div>
            <ReportCard label="Revenue Report" value={`$ ${reports.revenue_by_year.reduce((a, b) => a + b, 0).toFixed(2)}`} filterOptions={["October"]} onClick={() => setShowRevenue(!showRevenue)}>
                <LineChart width={1000} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    {showRevenue && <Line type="monotone" dataKey="Revenue" stroke="#BCE8B1" strokeWidth={4} fill="#A8B6FF" />}
                </LineChart>
            </ReportCard>
            <ReportCard label="Orders Report" value={`${reports.orders_by_year.reduce((a, b) => a + b, 0)}`} filterOptions={["October"]} onClick={() => setShowOrders(!showOrders)}>
                <BarChart width={1000} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    {showOrders && <Bar dataKey="Orders" fill="#A8B6FF" barSize={20} />}
                </BarChart>
            </ReportCard>
        </div>
    );
}
