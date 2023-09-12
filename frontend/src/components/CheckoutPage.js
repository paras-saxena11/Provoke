import React from "react";
import CheckoutForm from "./CheckoutForm.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const CheckoutPage = () => {
  const stripePromise = loadStripe(
    "pk_test_51MM7AsSGjzXbWRQSRXqdmMDD3606EZRFDoMXosbjt8XRoidkCrNGdMMyiU89BwmGUHxEZh1vLnO41xu9lFHfHpRK00d7aLaxYe"
  );
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />;
    </Elements>
  );
};

export default CheckoutPage;
