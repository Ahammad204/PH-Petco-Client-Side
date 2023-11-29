/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";


const PetListingCard = ({  petItem }) => {

    const { _id, pet_name, pet_age,  pet_location,  pet_image,pet_category } = petItem || {}

    return (

        <div className="card bg-base-100 shadow-xl " key={_id}>
            <figure><img className="w-full h-96" src={pet_image} alt={pet_name} /></figure>
            <div className="card-body">
                <h2 className="card-title font-extrabold text-3xl">{pet_name}</h2>
                <p className="text-base font-semibold mt-4">CATEGORY: {pet_category} </p>
                <p className="text-base font-semibold mt-4">Pet Age: {pet_age} </p>
                <p className="text-lg font-semibold text-[#f04336]">Pet Location:{pet_location}</p>
               

                <div className="card-actions justify-end">
                    <Link to={`/details/${_id}`}>  <button className="btn bg-[#f04336] hover:bg-[#f04336] text-white">Details</button></Link>
       
                </div>
            </div>
        </div>

    );
};

export default PetListingCard;