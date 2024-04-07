import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import FieldInput from './FieldInput';
import { useNavigate, useLocation } from 'react-router-dom';
import userIcon from '../assets/svg/users.svg';
import { updateCustomerDetails } from '../context/services/customer';
import {Loader} from './loader';  // Ensure this is the correct import path and component name
import { toast } from 'react-toastify';

export default function ViewUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1000)
  },[])

  useEffect(() => {
    const stateUser = location.state?.user;
    if (stateUser) {
      setUser({ ...user,...{name: stateUser.name, email: stateUser.email, phone: stateUser.phone,id : stateUser.id}});
    }
  }, [location.state?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (!value) {
      setErrors(prev => ({ ...prev, [name]: 'This field is required' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    console.log('user', user);
    Object.keys(user).forEach(key => {
      if (!user[key]) newErrors[key] = 'This field is required';
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await updateCustomerDetails(user);  // Assuming this returns a promise
        toast.success('User updated successfully');
        navigate('/dashboard/user-management');
      } catch (error) {
        toast.error('Failed to update user: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='flex flex-col gap-[2rem] h-full bg-white p-[2rem] rounded-[1rem]'>
      <h1 className='text-text text-[1.5rem] font-[600] tracking-[0.07813rem]'>{user.name?.toUpperCase() || '--'}</h1>
      <div className='flex gap-[2.5rem] justify-between p-[1.5rem]'>
        <div className='flex-1 border-r border-[#4B465C]'>
          <div className='flex gap-[1rem] items-center'>
            <img className='bg-primary-brand p-[0.5rem] rounded-[0.375rem]' src={userIcon} />
            <div>
              <h1 className='text-[#4B465C] text-[0.9375rem] font-[600] leading-[1.3125rem]'>Personal Details</h1>
              <p className='text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]'>Name/Email/Contact</p>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <FieldInput label="Full Name" boldLabel={true} name="name" value={user.name} error={errors.name} onChange={handleChange} />
          <FieldInput label="Email" boldLabel={true} name="email" value={user.email} error={errors.email} scanner={true} onChange={handleChange} />
          <FieldInput label="Phone Number" boldLabel={true} name="phone" value={user.phone} error={errors.phone} onChange={handleChange} />
          <div className='w-full m-2 d-flex justify-content-end'><PrimaryButton label="Update" action={handleSubmit} /></div>

      <FieldInput
        disabled={true}
        label="Address Line 1"
        boldLabel={true}
        name="address_line_1"
        value={location.state.user.address_line_1||'--'}
      />
      <FieldInput
        disabled={true}
        label="Address Line 2"
        boldLabel={true}
        name="address_line_2"
        value={location.state.user.address_line_2||'--'}
      />
      <FieldInput
        disabled={true}
        label="Country"
        boldLabel={true}
        name="country"
        value={location.state.user.country||'--'}
      />
    
      <FieldInput
        disabled={true}
        label="City"
        boldLabel={true}
        name="city"
        value={location.state.user.city||'--'}
      />
      <FieldInput
        disabled={true}
        label="State"
        boldLabel={true}
        name="state"
        value={location.state.user.state||'--'}
      />
   
      <FieldInput
        disabled={true}
        label="Pincode"
        boldLabel={true}
        name="pincode"
        value={location.state.user.pincode||'xxxxxx'}
      />
    
        </div>
      </div>
    </div>
  );
}
