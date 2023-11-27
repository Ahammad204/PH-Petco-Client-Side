/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";


const PetListingCard = ({ bookItem }) => {

    const { _id, pet_name, pet_age,  pet_location,  pet_image } = bookItem || {}

    return (

        <div className="card bg-base-100 shadow-xl " key={_id}>
            <figure><img className="w-full h-96" src={pet_image} alt={pet_name} /></figure>
            <div className="card-body">
                <h2 className="card-title font-extrabold text-3xl">{pet_name}</h2>
                <p className="text-base font-semibold mt-4">CATEGORY: </p>
                <p className={`text-lg font-semibold ${pet_age < 1 || pet_age < null ? 'text-red-600' : ''}`}>
                    {pet_age < 1 || pet_age < null ? 'Out of Stock' : `Available Books: ${pet_age}`}
                </p>


                <p className="text-lg font-semibold text-[#E59285]">AUTHOR:{pet_location}</p>
               

                <div className="card-actions justify-end">
                    <Link to={`/details/${_id}`}>  <button className="btn bg-[#E59285] hover:bg-[#E59285] text-white">Details</button></Link>
       
                </div>
            </div>
        </div>

    );
};

export default PetListingCard;