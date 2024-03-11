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
          console.log('Payment Dat:', data);
            
        //   try {
        //     const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/process-paypal-payment/`, 
        //     {
        //         paymentInfo: details,
        //         product_id: 1,
        //         extra_services: [1, 2],
        //         payment_period: "month"
        //     }, jwt_config);

        //     const res = response;
        //     console.log("Payment Success", res);
        //     toast.success(res.message)
            
        //     // Handle the response
        //     // For example, showing the user a success message or handling errors
        //   } catch (e) {
        //     toast.error(e?.response ? e?.response?.data?.detail : e?.message)
        //     toast.error(e?.response?.data)
        //     console.error('Error:', e.response ? e.response.data : e.message);
        //     // Handle the error
        //   }
          // Send payment details to backend
          fetch(`${import.meta.env.VITE_BACKEND_URL}/process-paypal-payment/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              paymentInfo: details,
              product_id: 9,
              // extra_services: [1],
              payment_period: "month"
              
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
            console.error('Payment processing error:', e);
            const msg = 'There was an issue processing your payment. Please try again.'
            toast.error(e.response ? e.response.data.detail : msg)
            alert('');
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