import React, { useState, useEffect, useRef } from 'react';
import eye from '../assets/svg/hide-password.svg';
import editFile from '../assets/svg/edit.svg';

export default function UserInput({ label, type, onChange, error, placeholder, value }) {
  const fileRef = useRef(null);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    setInputType(type);
  }, [type]);

  const handleFileChange = (e) => {
    onChange(e.target.files[0].name);
  };

  const togglePasswordVisibility = () => {
    setInputType(prevType => prevType === "password" ? "text" : "password");
  };

  return (
    <div className='flex flex-col gap-[8px] w-full'>
      <label className='text-[1rem] font-[600] leading-[1.25rem]'>{label}</label>
      <div className={`w-full flex justify-between px-[0.5rem] py-[0.625rem] rounded-md border border-[#D5D5D5] ${error && 'border-red-500'}`}>
        <input className="w-full outline-none text-[0.75rem] text-[#656565] font-[400] leading-[1.5rem] bg-transparent" type={inputType && inputType !== 'file' ? inputType : 'text'} placeholder={type === 'file' && value ? value : placeholder} value={type !== 'file' ? value : undefined} onChange={e => onChange(e.target.value)} disabled={type === 'file'} />
        {type === "file" && <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} />}
        {type === "file" && <img className="cursor-pointer w-[1.5rem]" src={editFile} alt="file" onClick={() => fileRef.current.click()} />}
        {type === "password" && <img className="cursor-pointer w-[1.5rem]" src={eye} alt="eye" onClick={togglePasswordVisibility} />}
      </div>
      {error && <p className="text-red-500 text-xs mt-[0.5rem]">{error}</p>}
    </div>
  );
}
