import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePage/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Error/Error";
import Category from "../Pages/Category/Category";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[

        {

          path:"/",
          element:<Home></Home>

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

    }
  ]);