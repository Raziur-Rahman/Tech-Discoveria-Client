import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import moment from 'moment';
import toast from 'react-hot-toast';


const CheckOutForm = () => {
    const { user } = useAuth();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const TotalPrice = 20;
    useEffect(() => {
        if (TotalPrice > 0) {
            axiosSecure.post('/create_payment_intent', { price: TotalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, TotalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element
        if (card == null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("")
        }

        // Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "Annonymous",
                    name: user?.displayName || "Annonymous"
                }
            }
        })

        if (confirmError) {
            console.log('Confirm Error', confirmError)
        }
        else {

            const paymentInfo = {
                email: user?.email,
                price: TotalPrice,
                transactionId: paymentIntent.id,
                date: moment().toISOString()
            }

            if (paymentIntent.status === "succeeded") {
                const res = await axiosSecure.post('/payments', paymentInfo)
                console.log(res?.data);
                if (res.data?.result?.insertedId) {
                    toast.success("Your Payment is SuccessFull");
                    document.getElementById('my_modal_5').classList.remove("modal-open");
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary my-5' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-xl mt-5">{error}</p>
        </form>
    );
};

export default CheckOutForm;