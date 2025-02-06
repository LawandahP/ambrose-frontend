// src/components/PayPalButton.js
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { jwt_config } from '../pages/PaymentForm';

const PayPalButton = ({ totalAmount }) => {
  const paypalRef = useRef();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const accessToken = userDetails?.token?.access;

  useEffect(() => {
    window?.paypal?.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: "USD",
              value: totalAmount,
            },
          }],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          console.log('Payment Successful:', details);
          console.log('Payment Data:', data);
            
          // Send payment details to backend
          fetch(`${import.meta.env.VITE_BACKEND_URL}/paypal/pay/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              paymentInfo: details,
              booking: {
                "product": 4,
                "start_date": "2024-05-10",
                "end_date": "2024-05-12",
                "extra_services": [1]
              }
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log("Data", data);
            const detail = data.detail; // Assuming 'detail' is a key in your response object
            if (data.detail) {
                toast.error(data?.detail)
            } else {
                toast.success(data?.message)
            }
          })
          .catch((e) => {
            console.log('Payment processing error:', e);
            const msg = 'There was an issue processing your payment. Please try again.'
            toast.error(e.response ? e.response.data.detail : msg)
          });
        });
      },
    }).render(paypalRef.current);
    return () => {
    if (paypalRef.current) {
      paypalRef.current.innerHTML = '';
    }
  };
  }, [totalAmount]);

  return (
    <div>
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PayPalButton;