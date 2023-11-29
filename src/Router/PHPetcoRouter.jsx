import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePage/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Error/Error";
import Category from "../Pages/Category/Category";
import Petlisting from "../Pages/PetListingPage/PetListing/PetListing";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[

        {

          path:"/",
          element:<Home></Home>

        },{

          path:"/petlisting",
          element:<Petlisting></Petlisting>

        }

      ]
    },{

      path:"/login",
      element:<Login></Login>

    },{

      path:"/register",
      element:<Register></Register>

    },{

      path:"/category",
      element:<Category></Category>

    },{

      path:"/dashboard",
      element:<DashboardLayout></DashboardLayout>,
      errorElement:<Error></Error>,
      children:[

        {

          path:"/dashboard",
          element:<Dashboard></Dashboard>

        }

      ]

    }
  ]);