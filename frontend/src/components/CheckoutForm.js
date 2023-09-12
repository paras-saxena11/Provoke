import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("");
  const [bilingCycle, setBilingCycle] = useState("");
  const [paying, setPaying] = useState(false);

  const secret_key =
    "sk_test_51MM7AsSGjzXbWRQSnOHqDYfXJdZcMVeb0ZmkPkBHOnc2zkTBIyQfN5WM7N7ODBeyZisognqlloIWZlhuIfVox7mA009jg6XLAu";

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    const { client_secret } = await fetch(
      "http://localhost:5000/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret_key}`,
        },
        body: JSON.stringify({ amount }),
      }
    ).then((res) => res.json());
    if (client_secret === undefined) {
      setPaying(false);
      return;
    }

    // console.log("CLIENTSECRET", client_secret);
    const res = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);
    if (res.error) {
      console.error("Payment error:", res.error.message);
    } else {
      console.log("Payment successful:", res.paymentIntent);
    }
  }

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handlePay}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Plan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Biling Cycle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Biling Cycle"
                value={bilingCycle}
                onChange={(e) => setBilingCycle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <label htmlFor="card-element">Card</label>
            <CardElement id="card-element" />
          </Col>
        </Row>
        <Button className="mt-3" type="submit" disabled={paying}>
          {paying ? "Processing..." : "Pay"}
        </Button>
      </Form>
    </Col>
  );
}

export default CheckoutForm;
