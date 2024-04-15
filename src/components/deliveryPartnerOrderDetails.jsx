import React, { useEffect,useState } from 'react'
import GreenTick from '../assets/svg/green-tick.svg';
import LocationIcon from '../assets/svg/location-pin-dark.svg';
import partnerProfile from '../assets/images/partner-profile.svg';
import CallIcon from '../assets/svg/call-icon.svg';
import { useLocation } from 'react-router-dom';
// import { viewOrderDetails } from '../services/order';


export default function DeliveryPartnerOrderDetails() {
    const location=useLocation()
    console.log(location?.state?.cardDetails?.cardDetails,'-------------------- orderId');
    const [orderDetails,setOrderDetails]=useState({});
    const [loading,setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true)
    //     viewOrderDetails(location?.state?.details?.id).then((res) => {
    //         console.log(res?.data,'----------------------');
    //         setOrderDetails(res?.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     }).finally(() => {
    //         setLoading(false);
    //     })
    // },[])
  return (
    <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
        {/* {loading && <CustomLoader />} */}
        <h1 className='text-text text-[1.5rem] font-[600] tracking-[0.07813rem]'>Order Management &gt; Details</h1>
        <div className='flex gap-[1.62rem]'>
            <div className='flex flex-col gap-[0.62rem] bg-white w-fit max-w-[69.125rem] p-[2.5rem] rounded-[1rem] border border-[#D5D5D5] shadow-md'>
                <div className='flex flex-col gap-[1.44rem]'>
                    <div className='flex gap-[0.62rem]'>
                        <img className='' src={GreenTick} alt="tick"/>
                        <h1 className='text-[1.25rem] font-[500] tracking-[0.07813rem]'> Order #{location?.state?.cardDetails?.cardDetails?.order_id}</h1>
                    </div>
                    <div className='flex gap-[0.62rem]'>
                        <img className='' src={LocationIcon} alt="location"/>
                    <h1 className='text-[1.25rem] font-[500] tracking-[0.07813rem]'>Business Center 1, M Floor, The
Meydan Hotel,Jaipur, Rajasthan, 302034 </h1>
                    {/* <h1 className='text-[1.25rem] font-[500] tracking-[0.07813rem]'>{`${orderDetails?.order?.user_id?.address_line_1||'--'}, ${orderDetails?.order?.user_id?.address_line_2||'--'}, ${orderDetails?.order?.user_id?.city||'--'}, ${orderDetails?.order?.user_id?.state||'--'}, ${orderDetails?.order?.user_id?.pincode||'--'}`||'--'}</h1> */}
                    </div>
                    <h1 className='text-[1.25rem] font-[600] tracking-[0.07813rem]'>Order Details</h1>
                    <div className='flex flex-col gap-[0.69rem]'>
                        <div className='w-full flex flex-col gap-[0.44rem] pb-[0.69rem] border-b border-dashed border-black'>
                          <div className='w-full flex justify-between items-center'>
                            <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>1x &nbsp; &nbsp; Article 1</span>
                            <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; {location?.state?.cardDetails?.cardDetails?.amount}</span>
                        </div>
                          
                        </div>
                        <div className='w-full flex flex-col gap-[0.44rem] pb-[0.69rem] border-b border-dashed border-black'>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Item Bill</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; {orderDetails?.order?.amount}</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Handling Fee</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 5.00</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Delivery Fee</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Free</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Discount</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377; 00.00</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-[0.44rem]'>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>Grand Total</span>
                                <span className='text-[1rem] font-[500] tracking-[0.07813rem]'>&#8377;{location?.state?.cardDetails?.cardDetails?.amount+5}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
    
  )
}
