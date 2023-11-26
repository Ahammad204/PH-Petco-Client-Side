import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePage/Home/Home";
import MainLayout from "../Layouts/MainLayout";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[

        {

          path:"/",
          element:<Home></Home>

        }

      ]
    }
  ]);