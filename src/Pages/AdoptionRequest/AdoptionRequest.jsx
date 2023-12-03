
import {  FaPause, FaPlay, } from "react-icons/fa";
import Swal from "sweetalert2";

import { useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAdoptDonation from "../../Hooks/useAdoptRequest";


const AdoptionRequest = () => {
    const [adopt, refetch] = useAdoptDonation()
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const adoptPerPage = 10;

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

    const offset = (currentPage - 1) * adoptPerPage;
    const currentDonations = adopt.slice(offset, offset + adoptPerPage);
    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total Request: {adopt.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Refund</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentDonations?.map((adoptRequest, index) => <tr key={adoptRequest._id}>
                                <th>{index + 1}</th>
                             
                                <td>{adoptRequest?.names}</td>
                                <td> {adoptRequest?.email}</td>
                                <td> {adoptRequest?.phone}</td>
                                <td> {adoptRequest?.address}</td>

                                <td>
                                    <button
                                        onClick={() => handleRefund(adoptRequest)}
                                        className="btn btn-ghost btn-lg">
                                        {adoptRequest.status === 'active' ? <FaPause className="text-red-600" ></FaPause> : <FaPlay className="text-red-600"></FaPlay>}
                                    </button>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
                {adopt.length > adoptPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(adopt.length / adoptPerPage)}
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

export default AdoptionRequest;