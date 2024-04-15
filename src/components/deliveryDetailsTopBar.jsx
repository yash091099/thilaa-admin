import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEarningsByPartnerId,getWithdrawalsByPartnerId,approveDeliverPartnerWithdrawal,getDeliveriesByPartnerId } from '../context/services/deliveryPartner';
import { Loader } from './loader';
const StarRating = () => {
  const navigate=useNavigate();
  return (
    <span style={{
      color: '#3EB655',
      fontSize: '18px',
      fontWeight: '500',
      marginRight: '4px'
    }}>
      4.5 ★
    </span>
  );
};

export default function DeliveryDetailsTopBar(props) {
  const {details}=props;
  const navigate=useNavigate();
  const [earningsData, setEarningsData] = React.useState([]);
  const [withdrawalsData, setWithdrawalsData] = React.useState([]);
  const [deliveriesData, setDeliveriesData] = React.useState([]);
const [loading,setLoading]=useState(false);
  console.log(details,'---------------- details ')
  const infoCards = [
    { title: deliveriesData?.orders?.length||0, subtitle: 'Total Orders' },
    { title: '$. '+(earningsData?.total_earnings||0), subtitle: 'Total Earnings' },
    // { title: '$. 3000', subtitle: 'This Month Earnings' },
    { title: '$. '+(withdrawalsData?.withdrawals?.map(item=>item?.amount)?.reduce((a,b)=>a+b,0)||0), subtitle: 'Total Withdrawal '},
  ];

  useEffect(() => {
    if(details?.id){
setLoading(true);
      getEarningsByPartnerId(details?.id).then((response)=>{
        setEarningsData(response.data);
        console.log(response?.data ,'------------------ earnigns response');

      });
      getWithdrawalsByPartnerId(details?.id).then((response)=>{
        setWithdrawalsData(response.data);
        console.log(response?.data ,'------------------withdrawals response')
      });
      getDeliveriesByPartnerId(details?.id).then((response)=>{
        setDeliveriesData(response.data);
        console.log(response?.data ,'------------------ deliveries response')
      }).finally(()=>{
        setLoading(false);
      });
    }
  },[details])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      background: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid #D8D8D8'
    }}>
      {loading&&<Loader/>}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex',flexDirection: 'column'}}>
          <h1 style={{
            fontFamily: 'Noto Sans',
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '27.6px',
            color: '#000'
          }}>
           {details?.name||'--'}
          </h1>
          <StarRating />
          <a onClick={() => {navigate('/dashboard/delivery-partner-details',{state:{user:details}})}}style={{
            fontFamily: 'Noto Sans',
            fontSize: '12px',
            fontWeight: '500',
            lineHeight: '13.92px',
            color: '#3EB655',
            textDecoration: 'none',
            cursor:"pointer"
          }}>
            View Details
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {infoCards.map((card, index) => (
            <div key={index} style={{
              border: '1px solid #EEF0F3',
              width: '210px',
              padding: '10px',
              borderRadius: '10px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column-reverse',
              marginLeft: index !== 0 ? '10px' : '0'
            }}>
              <p style={{
                fontFamily: 'Noto Sans',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '13.92px',
                color: '#000',
                marginBottom: '4px',
                marginTop: '4px'
              }}>
                {card.subtitle}
              </p>
              <p style={{
                fontFamily: 'Noto Sans',
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '21.6px',
                color: '#000'
              }}>
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
