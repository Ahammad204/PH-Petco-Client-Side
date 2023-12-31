
import { FaEdit, FaPause, FaPlay, FaTrashAlt, } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAllDonation from "../../Hooks/useAllDonation";


const AllDonation = () => {
    const [allDonation, refetch] = useAllDonation()
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const DonationsPerPage = 10;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    //Handle Update Donation Status
    const handleUpdateAdoption = donation => {
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

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/donations/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your pet has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const offset = (currentPage - 1) * DonationsPerPage;
    const currentDonations = allDonation.slice(offset, offset + DonationsPerPage);





    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total Campaign: {allDonation.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Maximum Donation Amount</th>
                            <th>Donation Progress Bar</th>
                            <th>Update</th>
                            <th>Donation Status</th>
                            <th>Donator</th>
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
                                                <img src={donation?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{donation?.petName}</td>
                                <td className="text-center">{donation?.maxDonationAmount}</td>
                                <td>
                                    <progress className="progress progress-secondary w-56" value={donation?.donatedParcentage} max="100"></progress>

                                </td>
                                <td>
                                    <Link to={`/dashboard/updateDonation/${donation?._id}`}>
                                        <button
                                            className="btn btn-ghost btn-lg ">
                                            <FaEdit className="text-red-600
                                        "></FaEdit>
                                        </button>
                                    </Link>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleUpdateAdoption(donation)}
                                        className="btn btn-ghost btn-lg">
                                        {donation.status === 'active' ? <FaPause className="text-red-600" ></FaPause> : <FaPlay className="text-red-600"></FaPlay>}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(donation._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                {allDonation.length > DonationsPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(allDonation.length / DonationsPerPage)}
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

export default AllDonation;