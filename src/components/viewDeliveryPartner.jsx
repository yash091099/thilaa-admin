import React, { useEffect, useState } from "react";
import FieldInput from "./FieldInput";
import { useNavigate, useLocation } from "react-router-dom";
import userIcon from "../assets/svg/users.svg";
import documentsIcon from "../assets/svg/documents.svg";
import dollorIcon from "../assets/svg/dollor.svg";
import { Loader } from "./loader";
import { toast } from "react-toastify";
import { Unarchive, Verified } from "@mui/icons-material";

import {getDeliveryPartnersDetails,approveDeliveryPartnerDocuments} from "../context/services/deliveryPartner";
const Badge = ({ label, status, onClick }) => {
  const isVerified = status === 'Verified';
  return (
    <div
      className={`flex flex-col items-start gap-2 p-2 ${isVerified ? 'bg-green-100' : 'bg-red-100'} rounded-lg`}
      style={{ cursor: isVerified ? 'default' : 'pointer' }}
      onClick={!isVerified ? onClick : undefined}
    >
      <div className="flex gap-2 items-center">
        <span className={`material-icons-outlined ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
          {isVerified ? <Verified /> : <Unarchive />}
        </span>
        <div>
          <h1 className="text-sm font-semibold">{label}</h1>
          <p className={`text-xs font-semibold ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
            {isVerified ? 'Verified' : 'Unverified'}
          </p>
        </div>
      </div>
      {!isVerified && (
        <button className="px-3 py-1 bg-red-500 text-white rounded-md text-xs">
          Verify {label}
        </button>
      )}
    </div>
  );
};

export default function ViewDeliveryPartner() {
  const navigate = useNavigate();
  const location = useLocation();
  const {user}=location.state;
  const [state, setState] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deliveryPartnerDetails, setDeliveryPartnerDetails] = useState({});

  const fetchDeliveryPartnerDetails = async() => {
    setLoading(true);
    const response=await getDeliveryPartnersDetails(user?.id);
    console.log(response?.data ,'------------------ partner details response');
    if(response?.data?.success){
      setDeliveryPartnerDetails(response?.data);
      setLoading(false);
      
    }else{
      toast.error(response?.data?.message || "Failed to fetch delivery partner details");
      setLoading(false);
    }

    
  }

  useEffect(() => {
    fetchDeliveryPartnerDetails();
  }, [location.state]);
  const handleStatusChange = async (type) => {
    setLoading(true);
    try {
      const response = await approveDeliveryPartnerDocuments({ user_id: user?.id, type : type });
      if (response?.data?.success) {
        fetchDeliveryPartnerDetails(); // Refetch the updated data
        toast.success(`Status for ${type} successfully updated!`);
      } else {
        toast.error(response?.data?.message || `Failed to update status for ${type}`);
      }
    } catch (error) {
      toast.error('An error occurred while updating status.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-8 h-full bg-white p-8 rounded-lg">
      {loading && <Loader />}
      <h1 className="text-text text-2xl font-semibold tracking-wide">
        {user?.name?.toUpperCase() || "--"}
      </h1>
      <div className="flex gap-10 justify-between p-6">
        <div className="flex-1 flex flex-col gap-6 border-r border-gray-700">
          <div
            className="cursor-pointer flex gap-4 items-center"
            onClick={() => setState(1)}
          >
            <img
              className={`p-2 rounded-md ${
                state === 1 ? "bg-primary-brand" : "bg-gray-200"
              }`}
              src={userIcon}
              alt="Personal"
            />
            <div>
              <h1
                className={`text-lg font-semibold ${
                  state === 1 ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Personal Details
              </h1>
              <p className="text-gray-400 text-sm">
                Name/Email/Contact
              </p>
            </div>
          </div>
          <div
            className="cursor-pointer flex gap-4 items-center"
            onClick={() => setState(2)}
          >
            <img
              className={`p-2 rounded-md ${
                state === 2 ? "bg-primary-brand" : "bg-gray-200"
              }`}
              src={documentsIcon}
              alt="Documents"
            />
            <div>
              <h1
                className={`text-lg font-semibold ${
                  state === 2 ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Documents
              </h1>
              <p className="text-gray-400 text-sm">
                USA Documents
              </p>
            </div>
          </div>
          <div
            className="cursor-pointer flex gap-4 items-center"
            onClick={() => setState(3)}
          >
            <img
              className={`p-2 rounded-md ${
                state === 3 ? "bg-primary-brand" : "bg-gray-200"
              }`}
              src={dollorIcon}
              alt="Finance"
            />
            <div>
              <h1
                className={`text-lg font-semibold ${
                  state === 3 ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Bank Details
              </h1>
              <p className="text-gray-400 text-sm">
                Acc No/IFSC Code/Branch
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-4">
  <Badge label="Emergency Document" status={deliveryPartnerDetails?.documents?.emergency_status} onClick={() => handleStatusChange('emergency')} />
  <Badge label="Personal Document" status={deliveryPartnerDetails?.documents?.personal_status} onClick={() => handleStatusChange('personal')} />
  <Badge label="Vehicle Document" status={deliveryPartnerDetails?.documents?.vehicle_status} onClick={() => handleStatusChange('vehicle')} />
  <Badge label="Bank Document" status={deliveryPartnerDetails?.documents?.bank_status} onClick={() => handleStatusChange('bank')} />
</div>
      </div>

        </div>
        {state === 1 && (
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-text text-2xl font-semibold">
              Personal Details
            </h1>
            <FieldInput
              label="Full Name"
              boldLabel={true}
              name="name"
              value={(deliveryPartnerDetails?.partner?.name||'--') }
              disabled={true}
            />
            <FieldInput
              label="Email"
              boldLabel={true}
              name="email"
              value={deliveryPartnerDetails?.partner?.email || '--'}
              disabled={true}
            />
            <FieldInput
              label="Phone Number"
              boldLabel={true}
              name="mobile_number"
              value={deliveryPartnerDetails?.partner?.phone || '--'}
              disabled={true}
            />
            <FieldInput
              label="Alternative Phone Number"
              boldLabel={true}
              name="secondary_mobile_number"
              value={deliveryPartnerDetails?.documents?.alternate_mobile_number || '--'}
              disabled={true}
            />
            <FieldInput
              label="Address"
              boldLabel={true}
              name="address"
              value={deliveryPartnerDetails?.profile?.address || '--'}
              disabled={true}
            />
            <FieldInput
              label="City"
              boldLabel={true}
              name="city"
              value={deliveryPartnerDetails?.profile?.city || '--'}
              disabled={true}
            />
         
            {deliveryPartnerDetails?.profile?.photo &&<div className="flex gap-4 items-center">
              <img
                src={`https://thilaa.jethitech.com/storage/${deliveryPartnerDetails?.profile?.photo}`}
                alt="Profile"
                style={{ width: "200px", height: "200px" }}
              />
              <p>{deliveryPartnerDetails?.profile?.first_name + " " + deliveryPartnerDetails?.profile?.last_name || '--'}</p>
            </div>}
            {!deliveryPartnerDetails?.profile?.photo && <p>No image uploaded</p>}
          </div>
        )}
        {state === 2 && (
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-text text-2xl font-semibold">
              Documents
            </h1>
            <div className="flex gap-4 items-center">
              <p>Driving License:</p>
              {deliveryPartnerDetails?.documents?.driving_license ? (
                <img
                  src={`https://thilaa.jethitech.com/storage/${deliveryPartnerDetails.documents.driving_license}`}
                  alt="Driving License"
                  style={{ width: "200px", height: "200px" }}
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <p>Address Proof (Aadhar Card):</p>
              {deliveryPartnerDetails?.documents?.aadhar_card ? (
                <img
                  src={`https://thilaa.jethitech.com/storage/${deliveryPartnerDetails.documents.aadhar_card}`}
                  alt="Aadhar Card"
                  style={{ width: "200px", height: "200px" }}
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
          </div>
        )}
        {state === 3 && (
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-text text-2xl font-semibold">
              Bank Details
            </h1>
            <FieldInput
              label="Bank Name"
              boldLabel={true}
              disabled={true}
              value={deliveryPartnerDetails?.documents?.bank_name || '--'}
            />
            <FieldInput
              label="Account Number"
              boldLabel={true}
              disabled={true}
              value={deliveryPartnerDetails?.documents?.account_number || '--'}
            />
            <FieldInput
              label="Routing Number"
              boldLabel={true}
              disabled={true}
              value={deliveryPartnerDetails?.documents?.routing_number || '--'}
            />
            <div className="flex gap-4 items-center">
              <p>Bank Statement/Void Cheque:</p>
              {deliveryPartnerDetails?.documents?.bank_statement ? (
                <img
                  src={`https://thilaa.jethitech.com/storage/${deliveryPartnerDetails.documents.bank_statement}`}
                  alt="Bank Statement"
                  style={{ width: "200px", height: "200px" }}
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
