import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePage/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Error/Error";
import Category from "../Pages/Category/Category";
import Petlisting from "../Pages/PetListingPage/PetListing/PetListing";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRouter";
import AddPet from "../Pages/Addpet/AddPet";
import MyAddedPets from "../Pages/MyAddedPets/MyAddedPets";
import UpdatePet from "../Pages/UpdatePet/UpdatePet";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [

      {

        path: "/",
        element: <Home></Home>

      }, {

        path: "/petlisting",
        element: <Petlisting></Petlisting>

      }

    ]
  }, {

    path: "/login",
    element: <Login></Login>

  }, {

    path: "/register",
    element: <Register></Register>

  }, {

    path: "/category",
    element: <Category></Category>

  },{

    path:'/details/:id',
    element:<PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>

  }, {

    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement: <Error></Error>,
    children: [
      {

        path: "/dashboard/addPet",
        element: <PrivateRoute><AddPet></AddPet></PrivateRoute>

      }, {

        path: "/dashboard/addedPet",
        element: <PrivateRoute><MyAddedPets></MyAddedPets></PrivateRoute>

      }, {
        path: '/dashboard/updateItem/:id',
        element: <PrivateRoute><UpdatePet></UpdatePet></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/pet/${params.id}`)
      },

    ]

  }
]);