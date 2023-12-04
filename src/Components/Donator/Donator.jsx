

import { useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";
import useDonator from "../../Hooks/useDonator";


const Donator = () => {
    const [donator] = useDonator()
    const [currentPage, setCurrentPage] = useState(1);
    const DonatorPerPage = 10;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };


    const offset = (currentPage - 1) * DonatorPerPage;
    const currentDonators = donator.slice(offset, offset + DonatorPerPage);



    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total Donator: {donator.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Donator Email</th>
                            <th>Donated Amount</th>
                            <th>Transaction Id</th>
                           
                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentDonators?.map((donator, index) => <tr key={donator._id}>
                                <th>{index + 1}</th>
                               
                                <td>{donator?.donatorEmail}</td>
                                <td className="text-center">{donator?.donateAmount}</td>
                                <td className="text-center">{donator?.transactionId}</td>
                               
                            </tr>)
                        }

                    </tbody>
                </table>
                {donator.length > DonatorPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(donator.length / DonatorPerPage)}
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

export default Donator;