
import { FaEdit, FaPaw, FaTrashAlt, } from "react-icons/fa";
import useAddedPets from "../../Hooks/useAddedPets";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";


const MyAddedPets = () => {
    const [pet, refetch] = useAddedPets()
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 10;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    //Handle Delete Pet
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

                axiosSecure.delete(`/pet/${id}`)
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
    const handleUpdateAdoption = pet => {
        axiosSecure.patch(`/pet/user/${pet._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${pet.petName} is an Adopt Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const offset = (currentPage - 1) * petsPerPage;
    const currentPets = pet.slice(offset, offset + petsPerPage);
    return (
        <div className="container mx-auto">
        <div className="my-4">
          <h2 className="text-3xl text-center">Total Pets: {pet.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Adoption Status</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Adopted</th>
              </tr>
            </thead>
            <tbody>
              {currentPets?.map((pet, index) => (
                <tr key={pet._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={pet.image} alt="Avatar" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border px-4 py-2">{pet.petName}</td>
                  <td className="border px-4 py-2">{pet.category}</td>
                  <td className="border px-4 py-2">
                    {pet.adopted === false ? "Not Adopted" : "Adopted"}
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/dashboard/updateItem/${pet._id}`}>
                      <button className="btn btn-ghost btn-lg ">
                        <FaEdit className="text-red-600"></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleUpdateAdoption(pet)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaPaw className="text-red-600"></FaPaw>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pet.length > petsPerPage && (
            <div className="mt-4">
              <Pagination
                count={Math.ceil(pet.length / petsPerPage)}
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

export default MyAddedPets;