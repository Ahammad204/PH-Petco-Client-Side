import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Pages/Footer/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
           <div className="mt-10">
           <Footer></Footer>
           </div>
            <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;