import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import PayPalButton from '../components/PayPalBtn';

import Paper from '@mui/material/Paper';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: 1099,
  };
  
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Paper sx={{
        margin: 10,
        padding: 2,
        width: "500px",
        backgroundColor: '#f5f5f5',
        display: "flex",
        flexDirection: "column",
        gap: "10px"
        // width: "200px"
      }}>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
        <p style={{marginBottom: "10px", fontWeight: "bold"}}>Pay with PayPal</p>
        <PayPalButton totalAmount={1000}/>
      </Paper>
    </div>
  )
}

export default PaymentPage