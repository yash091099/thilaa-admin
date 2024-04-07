import React from 'react'
import ReportCard from './ReportCard'
import graph0 from '../assets/Graph0.svg';
import graph1 from '../assets/Graph1.svg';
import graph2 from '../assets/Graph2.svg';

export default function Reports() {
  return (
    <div className='flex flex-col gap-[2rem]'>
        <div className='bg-white rounded-[1rem]'>
            <h1 className='text-[1.5rem] font-[600] px-[2rem] pt-[2rem]'>Reports</h1>
            <ReportCard label="Orders Delivered and Rejected" darkHeading={true} value="6000+" filterOptions={["Today"]}>
                <img className="w-full" src={graph0} alt="img" />
            </ReportCard>
        </div>
        <ReportCard label="Profit Report" value="₹ 25000" filterOptions={["October"]}>
            <img className="w-full" src={graph1} alt="img" />
        </ReportCard>
        <ReportCard label="Products in Inventory" value="52233" filterOptions={["October"]}>
            <img className="w-full" src={graph2} alt="img" />
        </ReportCard>
    </div>
  )
}
