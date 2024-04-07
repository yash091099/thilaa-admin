import React, { useRef, useState, useEffect } from 'react';
import notificationIcon from '../assets/svg/bell.svg';
import searchIcon from '../assets/svg/SearchIcon.svg';
import leftArrow from '../assets/svg/left-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../context/services/notifications';
import { NotificationImportantRounded } from '@mui/icons-material';

const sidebarItems = [
    { label: "Dashboard", action: "/dashboard" },
    { label: "User Management", action: "/dashboard/user-management" },
    { label: "Vendor Management", action: "/dashboard/vendor-management" },
    { label: "Analaytics & Reports", action: "/dashboard/reports" }
  ];
export default function Navbar(props) {
      
    const notificationRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const noteIcon = useRef(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.ctrlKey && event.key === '/') {
            // Focus on the search input when Ctrl + / is pressed
            searchInputRef.current.focus();
          }
        };
    
        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, []);
      const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = sidebarItems.filter(item =>
          item.label.toLowerCase().includes(query)
        );
        setSearchResults(filtered);
      };
    
      const handleSearchItemClick = (action) => {
        navigate(action);
        setSearchQuery('');
        setSearchResults([]);
      };
    
    useEffect(() => {
        // Simulate fetching notifications
        const fetchNotifications = async () => {
            const data = await getNotifications();
            setNotifications(data.data?.notifications);
        }
        fetchNotifications();
        const handler = (e) => {
            if (!notificationRef.current.contains(e.target) && !noteIcon.current.contains(e.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [props.notifications]);

    return (
        <nav className='relative flex justify-between items-center w-full bg-white px-[1.5rem] py-[0.75rem] rounded-md'>
            <div className='flex gap-[0.62rem] items-center w-full'>
                <img src={searchIcon} alt="search" className="w-[1.65rem]" />
                <input
          ref={searchInputRef}
          className='outline-none w-full border-r-2 border-black'
          type='text'
          placeholder='Search (Ctrl+/)'
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && searchResults.length > 0 && (
          <div style={{position: 'absolute', top: '4vw', width:"40vw"}} className=" bg-white border border-gray-200  rounded-md shadow-lg">
            {searchResults.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchItemClick(item.action)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}            </div>
            <div className='flex items-center gap-[2rem] w-fit'>
                <div ref={noteIcon} className='cursor-pointer relative' onClick={() => setShowNotifications(prev => !prev)}>
                    <img src={notificationIcon} alt="notifications" className="w-[1.5rem] ml-3" />
                </div>
                <div className='relative cursor-pointer' onClick={props.profileClick}>
                    <div className='flex justify-center items-center w-[2rem] h-[2rem] bg-[#6F6B7D] rounded-[50%] overflow-hidden'>
                        <p className='text-white text-[0.9375rem] font-[400] leading-[1.375rem]'>A</p>
                    </div>
                </div>
            </div>
            {showNotifications && (
                <div ref={notificationRef} className='absolute top-16 right-0 min-h-16 bg-white px-[1.5rem] py-[1.81rem] rounded-[8px] shadow-md'>
                    <div className='cursor-pointer flex items-center gap-[0.5rem] mb-[0.5rem]' onClick={() => setShowNotifications(false)}>
                        <img src={leftArrow} alt="back" />
                        <p className='text-[1.25rem] font-[600]'>Notifications</p>
                    </div>
                    <div className='flex flex-col'>
                        {notifications.length > 0 ? notifications.map(notification => (
                            <div key={notification.id} className='flex items-center gap-[0.5rem] min-w-[21.375rem] py-[1rem] border-b border-[#D9D9D9]'>
  <div className='min-w-[2.8125rem] h-[2.8125rem] rounded-[50%] bg-[#D9D9D9] flex items-center justify-center'>
            <NotificationImportantRounded style={{ color: '#6F6B7D' }} />
        </div>                                <div className='w-full flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <h1>{notification.message}</h1>
                                        <p>{new Date(notification.created_at).toLocaleTimeString()}</p>
                                    </div>
                                    <div title='Mark as read' className='w-3 h-3 rounded-[50%] bg-blue-500'></div>
                                </div>
                            </div>
                        )) : <p>No notifications found.</p>}
                    </div>
                </div>
            )}
        </nav>
    );
}
