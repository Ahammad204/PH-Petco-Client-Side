/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";



const Checkout = ({ _id, image, petName }) => {

    const [error, setError] = useState('')
    const [donated, setDonated] = useState()
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false);
    const stripe = useStripe()
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();


    // const email = user.email;
    const names = user.displayName;
    const email = user.email;

    axiosSecure.get('/donated', {
        params: {
            petName: petName,
        },
    })
        .then(response => {
            // console.log('Response:', response.data[0]);
            setDonated(response.data[0]);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });

    const maxDonationAmount = donated?.maxDonationAmount;
    // console.log(maxDonationAmount)

    const handleDonationChange = (event) => {
        const newDonation = parseFloat(event.target.value);
        if (donated.donatedAmount + newDonation > maxDonationAmount) {
            setError(`Total donation amount exceeds the maximum limit of $${maxDonationAmount}`);
        } else {
            setError('');
        }
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const form = event.target;

        const donation = form.donation?.value;


        // setDonation(donations)

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
            console.log(donation)

            const response = await axiosSecure.post('/create-payment-intent', { donation });
            setClientSecret(response.data.clientSecret);
            console.log(response.data.clientSecret);

            setError('')
            setLoading(false);

        }

        // Confirm Payment 
        const { paymentIntent, error: ConfirmError } = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {

                card: card,
                billing_details: {

                    email: email || 'Unknown',
                    name: names || 'Unknown'

                }

            }

        })

        if (ConfirmError) {

            console.log('Confirm Error')

        } else {

            console.log('Payment Intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {

                console.log('Transaction Id', paymentIntent.id)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Congratulation! You Save A Pet",
                    showConfirmButton: false,
                    timer: 1500
                });

                const donate = {

                    donatorEmail: email,
                    donateAmount: parseInt(donation),
                    transactionId: paymentIntent.id,
                    donatePetImage: image,
                    donatePetName: petName,

                }

                const res = await axiosSecure.post('/payment', donate)
                console.log(res)

                const donatedAmounts = (donated.donatedAmount === 0? donation: donated.donatedAmount)
                
                const donationPercentage = (parseFloat(donatedAmounts) / maxDonationAmount) * 100;

             
                console.log('Donation Percentage:', donationPercentage);


                const donatedItem = {

                    donatedAmount: parseFloat(donated.donatedAmount) + parseFloat(donation),

                }
                const donatedRes = await axiosSecure.patch(`/donated/${donated._id}`, donatedItem);

                const donatedItemParcentage = {

                    donatedParcentage:donationPercentage

                }
                const donatedPRes = await axiosSecure.patch(`/donation/parcentage/${_id}`, donatedItemParcentage);

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
                        <input
                            type="number"
                            required
                            name="donation"
                            placeholder="Enter Your Donation Amount"
                            className="input input-bordered w-full"
                            onChange={handleDonationChange}
                        />
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
            <button
                className="btn mt-10 btn-block text-white bg-[#E59285] hover:bg-[#E59285] "
                type="submit"
                disabled={!stripe || loading || (error !== '')}
            >
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