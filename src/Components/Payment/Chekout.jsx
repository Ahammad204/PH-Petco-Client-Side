/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const Checkout = () => {

    const [error, setError] = useState('')
    const [donation,setDonation] = useState()
    const [clientSecret,setClientSecret] = useState('')
    const [loading, setLoading] = useState(false);
    const stripe = useStripe()
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();

    // const email = user.email;
    const names = user.displayName;
    const email = user.email;
   

    const handleSubmit = async (event) => {

        event.preventDefault();

        const form = event.target;

        const donations = form.donation?.value;
        console.log(donations)

        setDonation(donations)

        if (!stripe || !elements || loading) {

            return;

        }
        setLoading(true);

        const card = elements.getElement(CardElement)
        console.log(card)

        if (card === null) {

            return;

        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({

            type: 'card',
            card

        })

        if (error) {

            console.log('payment Error', error)
            setError(error.message)

        }
        else {

            console.log('Payment Method', paymentMethod)

            const response = await axiosSecure.post('/create-payment-intent', { donation });
            setClientSecret(response.data.clientSecret);
            console.log(response.data.clientSecret);

            setError('')
            setLoading(false);

        }

        // Confirm Payment 
        const { paymentIntent, error:ConfirmError} = await stripe.confirmCardPayment(clientSecret,{

            payment_method:{

                card: card,
                billing_details:{

                    email: email || 'Unknown',
                    name: names || 'Unknown'

                }

            }

        })

        if(ConfirmError){

            console.log('Confirm Error')

        }else{

            console.log('Payment Intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){

                console.log('Transaction Id', paymentIntent.id)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Congratulation! You Save A Pet",
                    showConfirmButton: false,
                    timer: 1500
                  });

            }

        }


    }


    return (
        <form onSubmit={handleSubmit}>

            {/* Name and Email row */}
            <div className="md:flex mb-8">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <label className="input-group">

                        <input type="text" disabled defaultValue={names} required name="names" placeholder="Enter Your Full Name" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 ml-4">
                    <label className="label">
                        <span className="label-text">Enter Your Donation Amount</span>
                    </label>
                    <label className="input-group">

                        <input type="number" required name="donation" placeholder="Enter Your Donation Amount" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

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
            <button className="btn mt-10 btn-block text-white bg-[#E59285] hover:bg-[#E59285] " type="submit" disabled={!stripe || loading }>
                Donate
            </button>
            {/* <input  type="submit" value="Donate" /> */}
            <p className="text-red-600">
                {error}
            </p>

        </form>
    );
};

export default Checkout;