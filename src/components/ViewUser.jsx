import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import FieldInput from './FieldInput'
import SuccessModal from './SuccessModal'
import { useNavigate } from 'react-router-dom'
import userIcon from '../assets/svg/users.svg';
export default function ViewUser() {
    const navigate = useNavigate();
    const [successModal,setSuccessModal] = useState(false);
  return (
    <div className='flex flex-col gap-[2rem] h-full bg-white p-[2rem] rounded-[1rem]'>
      <h1 className='text-text text-[1.5rem] font-[600] tracking-[0.07813rem]'>Edgor Jones</h1>
      <div className='flex gap-[2.5rem] justify-between p-[1.5rem]'>
        <div className='flex-1 border-r border-[#4B465C]'>
            <div className='flex gap-[1rem] items-center'>
              <img className='bg-primary-brand p-[0.5rem] rounded-[0.375rem]' src={userIcon} />
              <div>
                <h1 className='text-[#4B465C] text-[0,9375rem] font-[600] leading-[1.3125rem]'>Personal Details</h1>
                <p className='text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]'>Name/Email/Contact</p>
              </div>
            </div>
        </div>
        <div className='flex-1'>
        <h1 className='text-text text-[1.5rem] font-[600] tracking-[0.07813rem]'>Personal Details</h1>
            <FieldInput 
            label="Full Name"
            boldLabel={true}
            placeholder="Full Name"
            type="text"
            />
            <FieldInput 
            label="Email"
            boldLabel={true}
            placeholder="Email"
            type="text"
            scanner={true}
            />
            <FieldInput 
            label="Phone Number"
            boldLabel={true}
            placeholder="+912345678920"
            type="text"
            />
            <div className='flex flex-col gap-[8px] w-full'>
          <label className='text-[1rem] font-[600] leading-[1.25rem]'>Address of your store</label>
          <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
            <input  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]" type="text" placeholder="Address line 1"/>
          </div>
          <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
            <input  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]" type="text" placeholder="Address line 2"/>
          </div>
          <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
              <select  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                <option>Country</option>
              </select>
            </div>
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
              <select  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                <option>State</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
              <select  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                <option>City</option>
              </select>
            </div>
            <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}>
              <select  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]">
                <option>Pincode</option>
              </select>
            </div>
          </div>
        </div>
            {/* <div className='w-1/2'><PrimaryButton label="Update" action={()=>{setSuccessModal(true)}} /></div> */}
        </div>
        {/* {successModal && <SuccessModal onClose={setSuccessModal} onClickAction={()=>{navigate('/dashboard/user-management')}}/> } */}
      </div>
    </div>
  )
}
