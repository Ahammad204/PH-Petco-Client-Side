/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Checkout from "../../Components/Payment/Chekout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const DonationDetailsPage = () => {

    const { id } = useParams()
    const [donationDetails, setDonationDetails] = useState();
    const [suggestedDonations, setSuggestedDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { _id, petName, maxDonationAmount, longDescription, image, ownerEmail, status,donatedAmount } = donationDetails || {}

    const { user } = useAuth();

    const email = user?.email;
    const names = user?.displayName;
    const donationId = _id;


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(`https://php-etco-server-side.vercel.app/donationCampaign`);
            const data = await response.json();
            const filteredProducts = data.filter((item) => item._id === id);
            setDonationDetails(filteredProducts[0]);

            setIsLoading(false);

        };

        fetchData();
    }, [email, donationId, id]);


    useEffect(() => {
        const fetchSuggestedDonations = async () => {
            try {
                const response = await fetch('https://php-etco-server-side.vercel.app/donationCampaign');
                const data = await response.json();
                setSuggestedDonations(data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching suggested donations:', error);
            }
        };

        fetchSuggestedDonations();
    }, []);





    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${image})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-zinc-100">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold ">{petName}</h1>
                        <p className="mb-5 text-lg  font-medium">{longDescription}</p>

                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
                            {/* <button className="btn bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit">Category {category}</button> */}

                            <button className="btn h-auto bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit"> Max Donation Amount: ${maxDonationAmount}</button>

                            <button className="btn h-auto bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit"> {petName}</button>

                        </div>

                        <div className="">

                            <button

                                className="btn mt-10 btn-block border-none text-white bg-[#E59285] hover:bg-[#E59285] "
                                disabled={status === 'paused'}
                                onClick={() => {

                                    document.getElementById('my_modal_1').showModal();

                                }}

                            >
                                Donate Now
                            </button>




                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <dialog id="my_modal_1" className="modal text-slate-500">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <div className="mt-4">

                                        <SectionTitle heading="Donate" subHeading="save pet"></SectionTitle>

                                        <div>
                                            <Elements stripe={stripePromise}>

                                                <Checkout _id={_id} image={image} petName={petName} donatedAmount={donatedAmount} maxDonationAmount={maxDonationAmount} ownerEmail={ownerEmail}></Checkout>

                                            </Elements>
                                        </div>


                                    </div>
                                </div>
                            </dialog>

                        </div>

                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Suggested Donations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {suggestedDonations.map((donation) => (
                        <div key={donation._id} className="bg-white p-4 rounded-md shadow-md">
                            <h3 className="text-lg font-semibold mb-2">{donation.petName}</h3>
                            <p className="text-gray-600">{donation.shortDescription}</p>
                            <Link to={`/donationDetails/${donation._id}`} className="text-blue-500 mt-2 block">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DonationDetailsPage;