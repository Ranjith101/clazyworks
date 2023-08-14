import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!stripe || !elements) {
    //         return;
    //     }

    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement),
    //     });

    //     if (error) {
    //         console.error('Error creating payment method:', error);
    //     } else {
    //         // Payment method token is in paymentMethod.id
    //         console.log('Payment method token:', paymentMethod.id);
    //         // Send the payment method token to your backend for further processing
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    
        if (error) {
            console.error('Error creating payment method:', error);
        } else {
            // Payment method token is in paymentMethod.id
            console.log('Payment method token:', paymentMethod.id);
            // Send the payment method token to your backend for further processing
            try {
                await axios.post('http://localhost:3001/api/payment/create-payment-intent', {
                    amount: 1000, // Specify the amount
                    currency: 'usd', // Specify the currency
                    paymentMethodToken: paymentMethod.id, // Send the payment method token
                });
                console.log('Payment successful');
            } catch (error) {
                console.error('Error making payment:', error);
            }
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Pay</button>
        </form>
    );
};

export default PaymentForm;
