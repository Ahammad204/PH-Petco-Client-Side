
import { FaBan,  FaUserTie, } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";


const AllUser = () => {
    const [users, refetch] = useUser()
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const DonationsPerPage = 10;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    //Handle Make Admin Status
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `User Role is Update Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
 //Handle Make Admin Status
 const handleUserBan = user => {
    axiosSecure.patch(`/users/ban/${user._id}`)
        .then(res => {
            console.log(res.data)
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `User Status is Update Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
}


    const offset = (currentPage - 1) * DonationsPerPage;
    const currentUsers = users.slice(offset, offset + DonationsPerPage);





    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total User: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Banned User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsers?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.name}</td>
                                <td >{user?.email}</td>

                                <td>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-ghost btn-lg ">
                                        <FaUserTie className="text-red-600
                                        "></FaUserTie>
                                    </button>

                                </td>
                                <td>

                                    <button
                                    onClick={() => handleUserBan(user)}
                                        className="btn btn-ghost btn-lg ">
                                        <FaBan className="text-red-600
                                        "></FaBan>
                                    </button>

                                </td>



                            </tr>)
                        }

                    </tbody>
                </table>
                {users.length > DonationsPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(users.length / DonationsPerPage)}
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

export default AllUser;