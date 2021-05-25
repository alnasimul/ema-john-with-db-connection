import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardFrom';

const stripePromise = loadStripe('pk_test_51Is75eHUxZDcuUQlBhkGFUnYQyDDXEmuQ53By1csoAf35CXW3O5K8zV8tP6O0neQ4YJV7jZvuILt037FKC1VXUsc00ORykV3ke');


const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment = {handlePayment} ></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;