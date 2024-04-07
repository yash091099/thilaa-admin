import React, { useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";

export default function ProfileManagement() {
  const [state, setState] = useState(1);
  return (
    <div className="flex gap-[2.19rem] bg-white p-[2rem] rounded-[1rem] pr-[40%] min-h-screen">
      <div className="flex-1 flex flex-col gap-[1.5rem]">
        <div className="text-text text-[1.5rem] font-[600] w-fit">
          Change Password
        </div>
        <UserInput
          label="Old Passowrd"
          placeholder="**************"
          type="password"
        />
        <UserInput
          label="New Passowrd"
          placeholder="**************"
          type="password"
        />
        <UserInput
          label="Confirm Passowrd"
          placeholder="**************"
          type="password"
        />
        
        <PrimaryButton label="Update Passoword" action={() => {}} />
      </div>
    </div>
  );
}
