import { FaHome, FaUsers, } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { FaHandHoldingDollar, FaPaw } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";



const Dashboard = () => {
    // const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const { user } = useAuth()

    return (
        <div className="md:flex">
            {/* dashboard side bar */}
            <div className="md:w-64 min-h-screen  bg-[#af4e45] text-white">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li className="text-center mb-3">

                                Admin Home
                            </li>
                            <hr />
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allPets">
                                    <FaPaw></FaPaw>
                                    All Pets</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allDonation">
                                    <FaHandHoldingDollar></FaHandHoldingDollar>
                                    All Donation</NavLink>
                            </li>
                            <div className="divider"></div>
                        </>
                            :
                            <>

                            </>
                    }
                    {/* shared nav links */}
                    <li className="text-center mb-3">

                        User Home
                    </li>
                    <hr />
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/addPet">
                            <FaPaw></FaPaw>
                            Add A Pet</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addedPet">
                            <FaPaw></FaPaw>
                            My Added Pets </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/adoptionRequest">
                            <FaHandHoldingDollar></FaHandHoldingDollar>
                            Adoption Request</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/createDonationCampaign">
                            <FaHandHoldingDollar></FaHandHoldingDollar>
                            Create Donation Campaign</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addedDonation">
                            <FaHandHoldingDollar></FaHandHoldingDollar>
                            My Donation Campaign</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myDonation">
                            <FaHandHoldingDollar></FaHandHoldingDollar>
                            My Donation </NavLink>
                    </li>


                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <p className="text-4xl uppercase border-y-4 py-4 text-center"> Welcome {user.displayName}</p>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;