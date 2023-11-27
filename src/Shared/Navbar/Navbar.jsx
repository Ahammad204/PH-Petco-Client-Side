import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/WebsiteLogo/logo.png'
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {

    const { user, logout } = useAuth();
    console.log(user)

    const navLink = <>

        <li className="m-2 md:mr-5 text-lg hover:text-[#f04336]"><NavLink to="/">Home</NavLink></li>
        <li className="m-2 md:mr-5 text-lg hover:text-[#f04336]"><NavLink to="/">Pet Listing</NavLink></li>
        <li className="m-2 md:mr-5 text-lg hover:text-[#f04336]"><NavLink to="/">Donation Campaign</NavLink></li>

    </>

    return (

        <div className="navbar sticky  shadow-xl p-4 max-w-screen-xl ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-500 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <a className="  normal-case text-xl"><img src={logo} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end md:gap-3">


                {
                    user?.email ? <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">

                                <img src={user.photoURL} alt={user.displayName} />

                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <button className="btn btn-sm btn-ghost">{user.displayName}</button>

                            </li>
                            <li>
                                <button className="btn btn-sm btn-ghost">Dashboard</button>

                            </li>

                            <li>
                                <button className="btn btn-sm  btn-ghost"
                                    onClick={logout}
                                >Logout</button>

                            </li>
                        </ul>
                    </div>
                        :
                        <Link to="/login"><button className="btn text-white border-none bg-[#f04336] hover:bg-[#f04336]">Login Now</button></Link>
                }
            </div>
        </div>

    );
};

export default Navbar;
