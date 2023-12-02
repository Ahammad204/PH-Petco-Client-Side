
import {  FaPause, FaPlay, } from "react-icons/fa";
import Swal from "sweetalert2";

import { useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import useMyDonation from "../../Hooks/useMyDonation";


const MyDonation = () => {
    const [myDonation, refetch] = useMyDonation()
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const MyDonationsPerPage = 10;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    //Handle Update Donation Status
    const handleRefund = donation => {
        axiosSecure.patch(`/donation/user/${donation._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Campaign status is Update Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const offset = (currentPage - 1) * MyDonationsPerPage;
    const currentDonations = myDonation.slice(offset, offset + MyDonationsPerPage);
    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total Donated: {myDonation.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Donated Amount</th>
                            <th>Refund</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentDonations?.map((donation, index) => <tr key={donation._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={donation?.donatePetImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{donation?.donatePetName}</td>
                                <td> ${donation?.donateAmount}</td>

                                <td>
                                    <button
                                        onClick={() => handleRefund(donation)}
                                        className="btn btn-ghost btn-lg">
                                        {donation.status === 'active' ? <FaPause className="text-red-600" ></FaPause> : <FaPlay className="text-red-600"></FaPlay>}
                                    </button>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
                {myDonation.length > MyDonationsPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(myDonation.length / MyDonationsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDonation;