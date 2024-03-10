import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';


import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify'
import { RequireAuthentication } from '../services/authProtection';

import CircularProgress from '@mui/material/CircularProgress';
import CreatePaymentMethod from './CreatePaymentMethod'
import MyModal from '../components/Modal';

import { useSearchParams } from 'react-router-dom';

const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const accessToken = userDetails?.token?.access;

export const jwt_config = {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false)

  const submitPaymentToServer = async (paymentMethodId) => {
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/stripe/pay/`, {
        payment_method_id: paymentMethodId,
        product_id: 1,
        extra_services: [1, 2],

        // could be hour or week too
        payment_period: "month" 
      }, jwt_config);
      const paymentIntentResponse = response.data;
      console.log(paymentIntentResponse);
      toast.success(paymentIntentResponse?.message)

      // Use the clientSecret and Elements instance to confirm the setup
      const clientSecret = paymentIntentResponse.clientSecret;
      console.log(clientSecret)

      if (clientSecret) {
        const result = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: 'http://localhost:5173/pay/',
          },
          // Uncomment below if you only want redirect for redirect-based payments
          // redirect: "if_required",
        });
        if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        toast.error(`Payment failed: ${result.error.message}`);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          toast.success("Payment succeeded!");
        }
      }
      }
      


      setLoading(false)
      // Handle the response
      // For example, showing the user a success message or handling errors
    } catch (e) {
      setLoading(false)
      toast.error(e.response ? e.response.data.detail : e?.message)
      toast.error(e?.response?.data)
      console.error('Error:', e.response ? e.response.data : e.message);
      // Handle the error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      toast.error(submitError)
      // handleError();
      return;
    }
    submitPaymentToServer();
  };


  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchParams] = useSearchParams();

  // Function to send request to backend with payment_intent
  // for email sending and updating purchase details

  const verifyPaymentIntent = async (paymentIntent) => {
    // setIsModalOpen(true); // Open modal with loader
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/purchases/verify/`, {
        payment_intent: paymentIntent,
      }, jwt_config);
      // Handle success response
      console.log(response.data);
      toast.success(response.data.message);
    } catch (e) {
      // Handle error response
      console.error(e);
      toast.error(e.response ? e.response.data.detail : e?.message)
      // toast.error("Failed to verify payment.");
    } finally {
      setIsModalOpen(false); // Close modal
    }
  };

  React.useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    if (paymentIntent) {
      setIsModalOpen(true)
    }
   
    window.onload = () => {
      if (paymentIntent) {
        verifyPaymentIntent(paymentIntent);
      }
    };
    // Cleanup function to remove the onload event listener when the component unmounts
    return () => window.onload = null;
  }, []);


  
  return (
    <div>
      <CssBaseline />
      <CreatePaymentMethod />

      <p style={{marginBottom: "10px", fontWeight: "bold"}}>Stripe Pay</p>
      <form 
        onSubmit={handleSubmit}
        style={{  borderRadius: '8px' }}>

        <PaymentElement />
        <Button 
          fullWidth
          variant="contained" 
          color="success" 
          type="submit" 
          disabled={!stripe || !stripe || !elements} 
          style={{ marginTop: '20px' }}>
          {loading ? <CircularProgress color="inherit" /> : "Pay"}
        </Button>
      </form>

      {isModalOpen && (
        <MyModal isOpen={isModalOpen}>
          <CircularProgress />
        </MyModal>
      )}

    </div>
    
  );
};

export default RequireAuthentication(PaymentForm);