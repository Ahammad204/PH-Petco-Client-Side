/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";


const DonationDetailsPage = () => {

    const { id } = useParams()
    const [petDetails, setPetDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { _id, petName,petAge, longDescription, image, category, email: ownerEmail } = petDetails || {}

    const { user } = useAuth();

    const email = user.email;
    const names = user.displayName;
    const petId = _id;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/petListing`);
            const data = await response.json();
            const filteredProducts = data.filter((item) => item._id === id);
            setPetDetails(filteredProducts[0]);

            setIsLoading(false);

        };

        fetchData();
    }, [email, petId, id]);

    const handleAdoptPet = (e) => {

        e.preventDefault();
        const form = e.target;

        const names = form.names?.value;
        const email = form.email?.value;
        const phone = form.phoneNumber?.value;
        const address = form.address?.value;


        const newAdopt = { names, email, phone, address, ownerEmail }

        console.log(newAdopt);

        //send data to the server
        fetch('http://localhost:5000/adopt', {

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
                        title: "Your Request has been sent",
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
                            <button className="btn bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit">Category {category}</button>

                            <button className="btn h-auto bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit"> Age: {petAge}</button>

                            <button className="btn h-auto bg-transparent text-white hover:bg-[#f04336]  border-2 border-[#f04336] hover:border-none font-outfit"> {petName}</button>

                        </div>

                        <div className="">

                            <button

                                className="btn"
                                onClick={() => {

                                    document.getElementById('my_modal_1').showModal();

                                }}

                            >
                                Adopt
                            </button>




                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <dialog id="my_modal_1" className="modal text-slate-500">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <form onSubmit={handleAdoptPet} className="mt-4">


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
                                                    <span className="label-text">E-Mail</span>
                                                </label>
                                                <label className="input-group">

                                                    <input type="email" disabled defaultValue={email} required name="email" placeholder="Enter Your Email" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Name and Email row */}
                                        <div className="md:flex mb-8">
                                            <div className="form-control md:w-1/2">
                                                <label className="label">
                                                    <span className="label-text">Phone Number</span>
                                                </label>
                                                <label className="input-group">

                                                    <input type="text" required name="phoneNumber" placeholder="Enter Your Phone Number" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                            <div className="form-control md:w-1/2 ml-4">
                                                <label className="label">
                                                    <span className="label-text">Address</span>
                                                </label>
                                                <label className="input-group">

                                                    <input type="text" required name="address" placeholder="Enter Your Address" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                        </div>




                                        <input className="btn btn-block text-white bg-[#E59285] hover:bg-[#E59285] " type="submit" value="Adopt" />
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