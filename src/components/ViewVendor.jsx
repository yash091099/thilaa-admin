import React, { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import FieldInput from "./FieldInput";
import SuccessModal from "./SuccessModal";
import { useNavigate, useLocation } from "react-router-dom";
import userIcon from "../assets/svg/users.svg";
import documentsIcon from "../assets/svg/documents.svg";
import dollorIcon from "../assets/svg/dollor.svg";
import UserInput from "./UserInput";
import { Loader } from "./loader";
import { toast } from "react-toastify";
import { VerifyStore } from "../context/services/vendor";
import {
  getVendorDetails,
  updateVendorDetails,
} from "../context/services/vendor";
import { Label, Unarchive, Verified } from "@mui/icons-material";
export default function ViewVendor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [state, setState] = useState(1);
  const [vendor, setVendor] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setUpdateForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        id: user.id,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value ? "" : "This field is required",
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    Object.keys(updateForm).forEach((key) => {
      if (!updateForm[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await updateVendorDetails(updateForm);
        toast.success("Vendor updated successfully");
        navigate("/dashboard/vendor-management");
      } catch (error) {
        toast.error("Failed to update user: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleVerify = async () => {
    const fetchData = async () => {
      try {
        const response = await getVendorDetails(user?.id);
        setVendor(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    try {
      await VerifyStore({ store_id: vendor?.store_details?.id });
      toast.success("Store verified successfully");
      fetchData();
      // navigate("/dashboard/vendor-management");
    } catch (error) {
      toast.error("Failed to verify store: " + error.message);
    }
  }
const formatDate=(dateString)=>{
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getVendorDetails(user?.id);
        setVendor(response.data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);
  return (
    <div className="flex flex-col gap-[2rem] h-full bg-white p-[2rem] rounded-[1rem]">
      {loading && <Loader />}
      <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
        {user?.name?.toUpperCase() || "--"}
      </h1>
      <div className="flex gap-[2.5rem] justify-between p-[1.5rem]">
        <div className="flex-1 flex flex-col gap-[1.5rem] border-r border-[#4B465C]">
          <div
            className="cursor-pointer flex gap-[1rem] items-center"
            onClick={() => setState(1)}
          >
            <img
              className={`p-[0.5rem] rounded-[0.375rem] ${
                state === 1 ? "bg-primary-brand" : "bg-[#F1F1F2]"
              }`}
              src={userIcon}
            />
            <div>
              <h1
                className={`text-[0,9375rem] font-[600] leading-[1.3125rem] ${
                  state === 1 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                }`}
              >
                Personal Details
              </h1>
              <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                Name/Email/Contact
              </p>
            </div>
          </div>
          <div
            className="cursor-pointer flex gap-[1rem] items-center"
            onClick={() => setState(2)}
          >
            <img
              className={`p-[0.5rem] rounded-[0.375rem] ${
                state === 2 ? "bg-primary-brand" : "bg-[#F1F1F2]"
              }`}
              src={documentsIcon}
            />
            <div>
              <h1
                className={`text-[0,9375rem] font-[600] leading-[1.3125rem] ${
                  state === 2 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                }`}
              >
                Documents
              </h1>
              <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                USA Documents
              </p>
            </div>
          </div>
          <div
            className="cursor-pointer flex gap-[1rem] items-center"
            onClick={() => setState(3)}
          >
            <img
              className={`p-[0.5rem] rounded-[0.375rem] ${
                state === 3 ? "bg-primary-brand" : "bg-[#F1F1F2]"
              }`}
              src={dollorIcon}
            />
            <div>
              <h1
                className={`text-[0,9375rem] font-[600] leading-[1.3125rem] ${
                  state === 3 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                }`}
              >
                Bank Details
              </h1>
              <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                Acc No/IFSC Code/Branch
              </p>
            </div>
          </div>
          {vendor?.store_details?.status === 'Inactive' && (
          <div onClick={handleVerify} className="cursor-pointer flex gap-4 items-center p-2 bg-red-100 rounded-lg mr-3">
            <span className="material-icons-outlined text-red-500"><Unarchive/></span>
            <div>
              {/* <h1 className="text-sm font-semibold leading-5">Verify Store</h1> */}
              <button className="mt-1 px-3 py-1 bg-red-500 text-white rounded-md text-xs">Verify Store</button>
            </div>
          </div>
        )}
{vendor?.store_details?.status === 'Active' && (
  <div className="cursor-pointer flex gap-4 items-center p-2 bg-green-100 rounded-lg mr-3">
    <span className="material-icons-outlined text-green-500"><Verified/></span>
    <div>
      <h1 className="text-sm font-semibold leading-5">Verified ({formatDate(vendor.store_details.verified_at)})</h1>
    </div>
  </div>
)}

        </div>
        {state === 1 && (
          <div className="flex-1 flex flex-col gap-[1rem]">
            <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
              Personal Details
            </h1>
            <FieldInput
              label="Full Name"
              boldLabel={true}
              name="name"
              value={updateForm.name}
              error={errors.name}
              onChange={handleChange}
            />
            <FieldInput
              label="Email"
              boldLabel={true}
              name="email"
              value={updateForm.email}
              error={errors.email}
              scanner={true}
              onChange={handleChange}
            />
            <FieldInput
              label="Phone Number"
              boldLabel={true}
              name="phone"
              value={updateForm.phone}
              error={errors.phone}
              onChange={handleChange}
            />
            <div className="w-full m-2 d-flex justify-content-end">
              <PrimaryButton label="Update" action={handleSubmit} />
            </div>
            <FieldInput
              label="Srore ID"
              disabled={true}
              boldLabel={true}
              placeholder="+912345678920"
              type="text"
              value={vendor?.store_details?.id || "--"}
            />
            <FieldInput
              disabled={true}
              label="Clover ID"
              boldLabel={true}
              placeholder="+912345678920"
              type="text"
              value={vendor?.store_details?.clover_mid || "--"}
            />
            {!vendor?.store_details?.passport_photo && (
              <UserInput
                disabled={true}
                label="Passport Size Photo"
                boldLabel={true}
                placeholder="abc.jpg"
                value={'--'}
                type="text"
              />
            )}
            {vendor?.store_details?.passport_photo && (
              <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Passport Image"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.store_details?.passport_photo}`}
                  alt="img"
                />
              </div>
            )}

            <div className="flex flex-col gap-[8px] w-full">
              <label className="text-[1rem] font-[600] leading-[1.25rem]">
                Address of your store
              </label>
              <div
                className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
              >
                <input
                  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                  type="text"
                  disabled={true}
                  value={vendor?.store_details?.address_line_1 || "--"}
                  placeholder="Address line 1"
                />
              </div>
              <div
                className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
              >
                <input
                  className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                  type="text"
                  disabled={true}
                  value={vendor?.store_details?.address_line_2 || "--"}
                  placeholder="Address line 2"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
                <div
                  className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
                >
                  <input
                    className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                    type="text"
                    disabled={true}
                    value={vendor?.store_details?.country || "--"}
                    placeholder="Country"
                  />
                </div>
                <div
                  className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
                >
                  <input
                    className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                    type="text"
                    disabled={true}
                    value={vendor?.store_details?.state || "--"}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-[0.5rem] w-full">
                <div
                  className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
                >
                  <input
                    className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                    type="text"
                    disabled={true}
                    value={vendor?.store_details?.city || "--"}
                    placeholder="City"
                  />
                </div>
                <div
                  className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5]`}
                >
                  <input
                    className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem]"
                    type="text"
                    disabled={true}
                    value={vendor?.store_details?.pincode || "--"}
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </div>
            {/* <div className='w-1/2'><PrimaryButton label="Update" action={()=>{setSuccessModal(true)}} /></div> */}
            {!vendor?.store_details?.front_photo && (
              <UserInput
                label="Image fo your store"
                boldLabel={true}
                placeholder="abc.jpg"
                value={'--'}
                type="text"
              />
            )}
            {vendor?.store_details?.front_photo && (
              <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Image fo your store"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.store_details?.front_photo}`}
                  alt="img"
                />
              </div>
            )}
          </div>
        )}
        {state === 2 && (
          <div className="flex-1 flex flex-col gap-[1rem]">
            <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
              Documents
            </h1>
            {!vendor?.store_documents?.driver_license && (
              <UserInput
                label="Image of Driver License"
                boldLabel={true}
                value={'--'}
                placeholder="abc.jpeg"
                type="text"
              />
            )}
              {vendor?.store_documents?.driver_license && (
              <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Image of Driver License"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.store_documents?.driver_license}`}
                  alt="img"
                />
              </div>
            )}
            
            {!vendor?.store_documents?.ein_certificate && (
              <UserInput
                label="Image of EIN certificate"
                boldLabel={true}
                placeholder="abc.jpeg"
                value={'--'}
                type="text"
              />
            )}
                {vendor?.store_documents?.ein_certificate && (
              <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Image of EIN certificate"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.store_documents?.ein_certificate}`}
                  alt="img"
                />
              </div>
            )}
            {!vendor?.store_documents?.state_tax_id && (
              <UserInput
                label="Image of State Tax ID"
                boldLabel={true}
                value={'--'}
                placeholder="abc.jpeg"
                type="text"
              />
            )}
                 {vendor?.store_documents?.state_tax_id && (
              <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Image of State Tax ID"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.store_documents?.state_tax_id}`}
                  alt="img"
                />
              </div>
            )}
            {!vendor?.store_documents?.address_proof && (
              <UserInput
                label="Image of Address Proof"
                boldLabel={true}
                value={'--'}
                placeholder="abc.jpeg"
                type="text"
              />
            )}
                  {vendor?.store_documents?.address_proof && (
              <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Image of Address Proof"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.store_documents?.address_proof}`}
                  alt="img"
                />
              </div>
            )}
            {!vendor?.store_documents?.business_address_proof && (
              <UserInput
                label="Image of Business Address Proof"
                boldLabel={true}
                value={'--'}
                placeholder="abc.jpeg"
                type="file"
              />
            )}
              {vendor?.store_documents?.business_address_proof && (
              <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Image of Business Address Proof"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.store_documents?.business_address_proof}`}
                  alt="img"
                />
              </div>
            )}
          </div>
        )}
        {state === 3 && (
          <div className="flex-1 flex flex-col gap-[1rem]">
            <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]">
              Bank Details <small style={{ color: "#89BF2C" }} >({vendor?.bank_details?.status?vendor?.bank_details?.status:'Not Uploaded'})</small>
            </h1>
            <FieldInput
              label="Bank Name"
              boldLabel={true}
              disabled={true}
              placeholder="Bank Name"
              value={vendor?.bank_details?.name||'--'}
              type="text"
            />
            <FieldInput
              label="Account Number"
              boldLabel={true}
              disabled={true}

              placeholder="Account Number"
              value={vendor?.bank_details?.account_number||'--'}

              type="text"
            />
            <FieldInput
              label="Routing Number"
              boldLabel={true}
              disabled={true}
              placeholder="Routing Number"
              value={vendor?.bank_details?.routing_number||'--'}
              type="text"
            />
           {!vendor?.bank_details?.statement && <UserInput
              label="Bank Statement/Void Checks"
              boldLabel={true}
              placeholder="abc.jpeg"
              disabled={true}
              value={'--'}
              type="text"
            />}
           {vendor?.bank_details?.statement && <div>
                <p
                  className={`text-[1rem] font-[600] ${
                    true ? "font-bold" : ""
                  }`}
                >
                  {"Bank Statement/Void Checks"}
                </p>{" "}
                <img
                  className="w-[150px] h-[150px"
                  src={`https://thilaa.jethitech.com/storage/${vendor?.bank_details?.statement}`}
                  alt="img"
                />
              </div> }
          </div>
        )}
      </div>
    </div>
  );
}
