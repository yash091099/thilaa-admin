import React, { useRef, useState } from 'react'
import notificationIcon from '../assets/svg/bell.svg'
import searchIcon from '../assets/svg/SearchIcon.svg'
import leftArrow from '../assets/svg/left-arrow.svg'
import { useNavigate } from 'react-router-dom'

export default function Navbar(props) {
    const notificationRef = useRef(null);
    const noteIcon = useRef(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    useState(()=>{
        let handler = (e) => {
            if (!notificationRef.current.contains(e.target) && !noteIcon.current.contains(e.target)) {
              setShowNotifications(false);
            }
          };
      
          document.addEventListener("mousedown", handler);
      
          return () => {
            document.removeEventListener("mousedown", handler);
          };
    })
  return (
    <nav className='relative flex justify-between items-center  gap-[2rem] w-full bg-white px-[1.5rem] py-[0.75rem] rounded-md'>
        <div className='flex gap-[0.62rem] items-center w-full'>
            <img className="w-[1.65rem]" src={searchIcon} alt="search"/>
            <input className='outline-none w-full border-r-2 border-black' type='text' placeholder='Search (Ctrl+/)' />
        </div>
        <div className='flex items-center gap-[2rem] w-fit'>
            <div ref={noteIcon} className='cursor-pointer relative' onClick={()=>{ setShowNotifications(prev => !prev)}}>
                <img className="w-[1.5rem]" src={notificationIcon} alt="notifications" />
                {/* <div className='absolute -top-1 -right-2 flex justify-center items-center text-white text-[0.8125rem] font-[600] leading-[0.875rem] w-[18px] h-[18px] bg-[#EA5455] rounded-[9px]'>
                    <p>4</p>
                </div> */}
            </div>
            <div className='relative cursor-pointer' onClick={props.profileClick}>
                <div className='flex justify-center items-center w-[2rem] h-[2rem] bg-[#6F6B7D] rounded-[50%] overflow-hidden'>
                    <p className='text-white text-[0.9375] font-[400] leading-[1.375rem]'>A</p>
                    {/* <img className='w-[2.375rem]' src={profilePicture} alt="profile"/> */}
                </div>
                {/* <img className='absolute bottom-0 right-0 w-[0.75rem]' src={statusIcon} alt="profile" /> */}
            </div>
        </div>
        {showNotifications && <div ref={notificationRef} className='absolute top-16 right-0 min-h-16 bg-white px-[1.5rem] py-[1.81rem] rounded-[8px] shadow-md'>
            <div className='cursor-pointer flex items-center gap-[0.5rem] mb-[0.5rem]' onClick={()=>{setShowNotifications(false)}}><img src={leftArrow} alt="back" /><p className='text-[1.25rem] font-[600]'>Notifications</p></div>
            <div className='flex flex-col'>
                {[1,2,3,4,5,6,7,].map(i=><div key={i} className='flex items-center gap-[0.5rem] min-w-[21.375rem] py-[1rem] border-b border-[#D9D9D9]'>
                    <div className='min-w-[2.8125rem] h-[2.8125rem] rounded-[50%] bg-[#D9D9D9]'>
                        {/* <img /> */}
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <h1>New notification</h1>
                            <p>2 days ago</p>
                        </div>
                        <div className='w-2 h-2 rounded-[50%] bg-blue-500'></div>
                    </div>
                </div>)}
            </div>
        </div>}
    </nav>
  )
}
