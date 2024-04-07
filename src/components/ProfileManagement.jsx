import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from './UserInput';
import PrimaryButton from './PrimaryButton';
import { updatePassword } from '../context/services/profile';
import { Loader } from './loader';
import { toast } from 'react-toastify';

export default function ProfileManagement() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!oldPassword) {
      errors.oldPassword = 'Old password is required';
      isValid = false;
    }
    if (!newPassword) {
      errors.newPassword = 'New password is required';
      isValid = false;
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
      isValid = false;
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {
        let response=await updatePassword({old_password: oldPassword,new_password: newPassword,new_password_confirmation:confirmPassword});
        if(response?.data?.success){

          toast.success('Password updated successfully');
          localStorage.clear()

          navigate('/');
        window.location.reload();

        }else{
          toast.error(response?.data?.message || 'Failed to update password');
        }
      } catch (error) {
        toast.error(error.message || 'Failed to update password');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex gap-[2.19rem] bg-white p-[2rem] rounded-[1rem] pr-[40%] min-h-screen">
      <div className="flex-1 flex flex-col gap-[1.5rem]">
        <div className="text-text text-[1.5rem] font-[600] w-fit">
          Change Password
        </div>
        <UserInput
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={setOldPassword}
          error={errors.oldPassword}
          placeholder="Enter old password"
        />
        <UserInput
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          error={errors.newPassword}
          placeholder="Enter new password"
        />
        <UserInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
          placeholder="Confirm new password"
        />
        <PrimaryButton label="Update Password" action={handleSubmit} />
        {loading && <Loader />}
      </div>
    </div>
  );
}
