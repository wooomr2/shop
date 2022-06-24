import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import StripeForm from "./StripeForm";
import "./stripe.css";

export default function Stripe() {
  const location = useLocation();
  const order = location.state;

  const [stripeApiKey, setStripeApiKey] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function createPaymentIntent() {
      if (!order) return;
      try {
        const { data } = await axios.post("/stripe/create-payment-intent", {
          amount: order.paymentPrice,
        });
        setStripeApiKey(data.stripeApiKey);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    }

    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log(clientSecret, appearance)

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={loadStripe(stripeApiKey)}>
          <StripeForm order={order} />
        </Elements>
      )}
    </div>
  );
}
