import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import upDark from '../assets/svg/up-icon-dark.svg';
import downLight from '../assets/svg/down-icon-light.svg';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Table({ data }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const itemsPerPage = 10;
  const [sortedData, setSortedData] = useState(data);

  const columns = [
    { name: "NAME", enableSorting: true, searchingEnabled: true, key: 'name' },
    { name: "PHONE", enableSorting: true, searchingEnabled: true, key: 'phone' },
    { name: "EMAIL", enableSorting: true, searchingEnabled: true, key: 'email' },
    { name: "ADDRESS", enableSorting: true, searchingEnabled: true, key: 'address_line_1' },
    { name: "DATE JOINED", enableSorting: true, searchingEnabled: true, key: 'created_at' }
  ];

  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortedData(sortedData);
    setCurrentPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedData]);

  const count = Math.ceil(sortedData.length / itemsPerPage);
  const fromIndex = (currentPage - 1) * itemsPerPage + 1;
  const toIndex = Math.min(currentPage * itemsPerPage, data.length);

  const handleRowClick = (user) => {
    navigate('/dashboard/view-user', { state: { user } });
  };

  const formatName = (name) => {
    return name.split(' ').map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className='flex flex-col gap-[2.5rem]'>
      <div className='flex flex-col w-full h-full border border-[#DBDADE] overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-[#DBDADE]'>
              {columns.map((column, index) => (
                <th key={index} className='text-left px-[1rem] py-[0.62rem]'>
                  <div className='flex gap-8 items-center'>
                    <p className='text-[#4B465C] text-[1.01563rem] font-[600] tracking-[0.07813rem]'>{column.name}</p>
                    {column.enableSorting && (
                      <div onClick={() => onSort(column.key)}>
                        <img className='cursor-pointer w-[1rem] h-[14px] object-cover' src={upDark} alt={`Sort Ascending for ${column.name}`} />
                        <img className='cursor-pointer w-[1rem] h-[14px] object-cover' src={downLight} alt={`Sort Descending for ${column.name}`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className='cursor-pointer h-[5rem] border-y border-[#DBDADE] hover:shadow-lg' onClick={() => handleRowClick(item)}>
                {columns.map((column, fieldIndex) => (
                  <td key={fieldIndex} className='px-[1rem] py-[0.62rem]'>
                    <div className='flex gap-8 items-center'>
                      {column.key === 'name' ? <p className='text-[#4B465C] text-[1.125rem] font-[400]'>{formatName(item[column.key])}</p> : 
                        column.key === 'created_at' ? <p className='text-[#4B465C] text-[1.125rem] font-[400]'>{formatDate(item[column.key])}</p> :
                        <p className='text-[#4B465C] text-[1.125rem] font-[400]'>{item[column.key]||'--'}</p>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination count={count} page={currentPage} onChange={handleChangePage} />
      </Stack>
      <div className='w-full flex justify-between items-center'>
        <p className='text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]'>Showing {fromIndex} to {toIndex} of {data.length}</p>
      </div>
    </div>
  );
}
