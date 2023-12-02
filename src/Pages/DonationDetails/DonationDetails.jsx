/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";



const DonationDetailsPage = () => {

    const { id } = useParams()
    const [donationDetails, setDonationDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { _id, petName, maxDonationAmount, longDescription, image, email: ownerEmail } = donationDetails || {}

    const { user } = useAuth();

    const email = user.email;
    const names = user.displayName;
    const donationId = _id;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/donationCampaign`);
            const data = await response.json();
            const filteredProducts = data.filter((item) => item._id === id);
            setDonationDetails(filteredProducts[0]);

            setIsLoading(false);

        };

        fetchData();
    }, [email, donationId, id]);

    const handleDonate = (e) => {

        e.preventDefault();
        const form = e.target;




        const newAdopt = {}

        console.log(newAdopt);

        //send data to the server
        fetch('http://localhost:5000/payment', {

            method: 'POST',
            headers: {

                'content-type': 'application/json'

            },
            body: JSON.stringify(newAdopt)

        })
            .then(res => res.json())
            .then(data => {

                if (data.insertedId) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Donation has been sent",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            })
    }


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

                            <button className="btn h-auto bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit"> Age: {maxDonationAmount}</button>

                            <button className="btn h-auto bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit"> {petName}</button>

                        </div>

                        <div className="">

                            <button

                                className="btn"
                                onClick={() => {

                                    document.getElementById('my_modal_1').showModal();

                                }}

                            >
                                Donate
                            </button>




                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <dialog id="my_modal_1" className="modal text-slate-500">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <form onSubmit={handleDonate} className="mt-4">


                                <SectionTitle heading="Donate" subHeading="save pet"></SectionTitle>

                                

                                        <input className="btn btn-block text-white bg-[#E59285] hover:bg-[#E59285] " type="submit" value="Donate" />
                                    </form>
                                </div>
                            </dialog>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationDetailsPage;