import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress';


import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import axios from 'axios';
import { toast } from 'react-toastify';
import { jwt_config } from "./PaymentForm";


export default function CreatePaymentMethod() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null)

  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const submitPaymentMethodToServer = async (paymentMethodId) => {
    setProcessing(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/stripe/payment-method/`, {
        payment_method_id: paymentMethodId,
        name: name,
        description: description 
      }, jwt_config);

      const paymentMethodRes = response.data;
      console.log(paymentMethodRes);
      toast.success(paymentMethodRes?.message)
      setProcessing(false);

    } catch (e) {
      setProcessing(false);
      toast.error(e.response ? e.response.data.detail : e?.message)
      console.error('Error:', e.response ? e.response.data : e.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setError(`Payment failed ${error.message}`);
      setProcessing(false);
    } else {
      setProcessing(false);
      console.log('[PaymentMethod]', paymentMethod);
      setSucceeded(true);

      // Send paymentMethod.id to the server and create payment method for authenticated user.
      submitPaymentMethodToServer(paymentMethod.id);
    }
  };
  
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <p style={{marginBottom: "10px", fontWeight: "bold"}}>Create Stripe Payment Method</p>
      <TextField
        sx={{
          marginBottom: 1
        }}
        fullWidth
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <TextField
        sx={{
          marginBottom: 2
        }}
        fullWidth
        size="small"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <Button
        fullWidth
        type="submit"
        sx={{
          marginTop: 2,
          marginBottom: 3
        }}
        variant="contained" 
        color="success" 
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <CircularProgress color="inherit" /> 
          ) : (
            "Create Payment Method"
          )}
        </span>
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}