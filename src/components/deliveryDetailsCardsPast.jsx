import React from 'react';

export default function DeliveryDetailsCardPast(props) {
  // Replace these with actual data passed through props
  const orderInfo = {
    id: '157614075142932',
    rating: '4.5',
    username: 'User Name',
    products: 'Product 1, Product 2, Product 3...',
    date: '16, June 2023'
  };

  return (
    <div style={{
      border: '1px solid #E3E6E8',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'Noto Sans',
      background: 'white',
      marginTop: '20px',
      marginBottom: '20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '500', lineHeight: '16.24px', color: '#000' }}>
            Order #{orderInfo.id} <span style={{ color: '#41B079' }}>{orderInfo.rating} ★</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: '500', lineHeight: '16.24px', color: '#000', marginTop: '4px' }}>
            {orderInfo.username}
          </div>
        </div>
        <div style={{
          color: '#41B079',
          backgroundColor: '#E5FFF2',
          borderRadius: '16px',
          padding: '2px 8px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          Completed
        </div>
      </div>
      <div style={{ fontSize: '12px', fontWeight: '400', lineHeight: '13.92px', color: '#000', marginBottom: '10px' }}>
        {orderInfo.products}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', fontWeight: '400', lineHeight: '13.92px', color: '#000' }}>
          {orderInfo.date}
        </div>
        <a href="#" style={{
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '13.92px',
          color: '#41B079',
          textDecoration: 'none'
        }}>
          View Details
        </a>
      </div>
    </div>
  );
}
