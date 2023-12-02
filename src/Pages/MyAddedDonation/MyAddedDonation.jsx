
import { FaEdit, FaPause, FaPlay, } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";
import useAddedDonation from "../../Hooks/useAddedDonation";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaHandHoldingDollar } from "react-icons/fa6";


const MyAddedDonation = () => {
    const [donation, refetch] = useAddedDonation()
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

    const offset = (currentPage - 1) * DonationsPerPage;
    const currentDonations = donation.slice(offset, offset + DonationsPerPage);
    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total Campaign: {donation.length}</h2>
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
                                    <progress className="progress progress-secondary w-56" value={0} max="100"></progress>


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
                                        onClick={() => {

                                            document.getElementById('my_modal_1').showModal();

                                        }}
                                        className="btn btn-ghost btn-lg">
                                        <FaHandHoldingDollar className="text-red-600" ></FaHandHoldingDollar>

                                    </button>


                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <dialog id="my_modal_1" className="modal text-slate-500">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <form className="mt-4">


                                            </form>
                                        </div>
                                    </dialog>

                                    
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                {donation.length > DonationsPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(donation.length / DonationsPerPage)}
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

export default MyAddedDonation;