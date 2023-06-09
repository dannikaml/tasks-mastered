import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';

const DONATE_MUTATION = gql`
  mutation Donate($amount: Float!) {
    donate(amount: $amount) {
      sessionId
    }
  }
`;

const stripePromise = loadStripe('pk_test_51NB5q0CQLaxfdfIj3kWFncE5r7K6JlkrWiVVmDJK5gLPN0n81bdzlAdLOys14AoE5j9b8LDady4QD98NQJu1jqp000vj0yvI5p');

const DonationForm = () => {
  const [amount, setAmount] = useState(0);
  const [donate] = useMutation(DONATE_MUTATION);

  const handleDonate = async () => {
    const stripe = await stripePromise;
    const parseAmount = parseFloat(amount);
    const { data } = await donate({ variables: { amount: parseAmount } });

    // Redirect to Stripe checkout
    const { sessionId } = data.donate;
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.log('Stripe error:', error);
    }
  };

  return (
    <div>
      <h2>Donate Now!</h2>
      <input
        type="number"
        min="1"
        step="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default DonationForm;



