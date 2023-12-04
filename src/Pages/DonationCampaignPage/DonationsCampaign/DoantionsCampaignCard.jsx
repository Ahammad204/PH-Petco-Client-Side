/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";


const DonationCampaignCard = ({  donationItem }) => {

    const { _id, petName, maxDonationAmount,donatedAmount, image, } = donationItem || {}

    console.log(donatedAmount)

    return (

        <div className="card bg-base-100 shadow-xl " key={_id}>
            <figure><img className="w-full h-96" src={image} alt={petName} /></figure>
            <div className="card-body">
                <h2 className="card-title font-extrabold text-3xl">{petName}</h2>
                <p className="text-base font-semibold mt-4">Maximum Donation Amount: {maxDonationAmount} </p>
                <p className="text-lg font-semibold text-[#f04336]">Donated Amount: ${donatedAmount} </p>
               

                <div className="card-actions justify-end">
                    <Link to={`/donationDetails/${_id}`}>  <button className="btn bg-[#f04336] hover:bg-[#f04336] text-white">Details</button></Link>
       
                </div>
            </div>
        </div>

    );
};

export default DonationCampaignCard;