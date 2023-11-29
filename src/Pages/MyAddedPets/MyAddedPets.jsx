
import { FaPaw, FaTrashAlt, FaWrench } from "react-icons/fa";
import useAddedPets from "../../Hooks/useAddedPets";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MyAddedPets = () => {
    const [pet, refetch] = useAddedPets()
    const axiosSecure = useAxiosSecure();
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

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Added Pets</h2>
                <h2 className="text-3xl">Total Pets: {pet.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Adoption Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Adopted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pet?.map((pet, index) => <tr key={pet._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={pet.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{pet.petName}</td>
                                <td>{pet.category}</td>
                                <td>
                                    {pet.adopted === false ? 'Not Adopted' : 'Adopted'}


                                </td>
                                <td>
                                    <button

                                        className="btn btn-ghost btn-lg">
                                        <FaWrench className="text-red-600"></FaWrench>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(pet._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                                <td>
                                    <button

                                        className="btn btn-ghost btn-lg">
                                        <FaPaw className="text-red-600"></FaPaw>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAddedPets;