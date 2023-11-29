import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../../Components/DashBoard/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {

    return (
        <div className="px-5 md:w-5/6 mx-auto mt-10 bg-base-300 space-y-4 rounded-xl pt-10">
            <h1 className="text-4xl text-center">Payment</h1>
            <div className="my-10 p-8">
                {
                    <Elements stripe={stripePromise}>
                        <CheckOutForm></CheckOutForm>
                    </Elements>

                }
            </div>
        </div>
    );
};

export default Payment;