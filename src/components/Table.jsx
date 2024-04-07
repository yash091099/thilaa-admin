import React, { useState } from 'react';
import TableButton from './TableButton';
import upDark from '../assets/svg/up-icon-dark.svg';
import downDark from '../assets/svg/down-icon-dark.svg';
import downLight from '../assets/svg/down-icon-light.svg';
import NameField from './NameField';
import StatusField from './StatusField';

export default function Table({ data , customers, vendors}) {
  const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    { name: "NAME", enableSorting: true, searchingEnabled: true },
    { name: "PHONE", enableSorting: true, searchingEnabled: true },
    { name: "EMAIL", enableSorting: true, searchingEnabled: true },
    { name: "ADDRESS WITH PINCODE", enableSorting: true, searchingEnabled: true },
    { name: "CREATED AT", enableSorting: true, searchingEnabled: true }
  ];

  const mapDataToFields = (item) => ([
    item.name,
    item.phone,
    item.email,
    `${item.address_line_1 || '--'}, ${item.pincode || '--'}, ${item.city || '--'}, ${item.state || '--'}, ${item.country || '--'}`.trim(),
    new Date(item.created_at).toLocaleDateString()
  ]);

  return (
    <div className='flex flex-col gap-[2.5rem]'>
      <div className='flex flex-col w-full h-full border border-[#DBDADE] overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-[#DBDADE]'>
              <th className='pl-[1.25rem] pr-[0.62rem] py-[0.94rem]'><input type="checkbox" /></th>
              {columns.map((column, index) => (
                <th key={index} className='text-left px-[1.56rem] py-[0.62rem]'>
                  <div className='flex gap-8 items-center'>
                    <p className='text-[#4B465C] text-[1.01563rem] font-[600] tracking-[0.07813rem]'>{column.name}</p>
                    <div>
                      <img className='cursor-pointer w-[1rem] h-[14px] object-cover' src={upDark} alt={`Sort Ascending for ${column.name}`} />
                      <img className='cursor-pointer w-[1rem] h-[14px] object-cover' src={downLight} alt={`Sort Descending for ${column.name}`} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='cursor-pointer h-[5rem] border-y border-[#DBDADE]'>
                <td className='pl-[1.25rem] pr-[0.62rem] py-[0.94rem]'><input type='checkbox'/></td>
                {mapDataToFields(item).map((field, fieldIndex) => (
                  <td key={fieldIndex} className='px-[1.56rem] py-[0.62rem]'>
                    <div className='flex gap-8 items-center'>
                      <p className='text-[#4B465C] text-[1.125rem] font-[400]'>{field}</p>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='w-full flex justify-between items-center'>
        <p className='text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]'>Showing 1 to {Math.min(10, data.length)} of {customers?customers:vendors}</p>
        {/* <div className='flex gap-[0.31rem] '>
          <TableButton label="Previous" />
          {[...Array(Math.ceil(data.length / 10)).keys()].map((_, index) => (
            <TableButton key={index} label={index + 1} activeButton={currentPage === index + 1} action={() => setCurrentPage(index + 1)} />
          ))}
          <TableButton label="Next" />
        </div> */}
      </div>
    </div>
  );
}
