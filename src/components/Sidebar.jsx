import React, { useState } from "react";
import dashboardIcon from "../assets/svg/dashboard-icon.svg";
import RighttArrowIcon from "../assets/svg/right-arrow-light-icon.svg";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Thilaa-Logo.svg';
export default function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-w-[19.6875rem] h-full min-h-screen bg-white shadow-xl">
      <div className="flex justify-between items-center text-text text-[3.5rem] font-[600] w-full px-[1.25rem] py-[2.5rem]" onClick={()=>{navigate('/dashboard')}}>
        <img className="w-[4.0625rem]" src={logo} alt="Logo" />
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <circle cx="10.4998" cy="10.5" r="0.833333" stroke="#4B465C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.4998" cy="10.5" r="0.833333" stroke="white" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.5" cy="10.5" r="7.5" stroke="#4B465C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.5" cy="10.5" r="7.5" stroke="white" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="flex flex-col px-[0.75rem]">
        <ListItem
          label="Dashboard"
          image={dashboardIcon}
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={()=>{navigate('/dashboard')}}
        ></ListItem>
        <ListItem
          label="User Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {navigate('/dashboard/user-management')}}
        >
        </ListItem>
        <ListItem
          label="Vendor Manangement"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={()=>{navigate('/dashboard/vendor-management')}}
        >
        </ListItem>
        <ListItem
          label="Analytics & Reports"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {navigate('/dashboard/reports')}}
        />        
      </div>
    </div>
  );
}
