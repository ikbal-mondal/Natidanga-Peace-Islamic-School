import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage";
import About from "./../pages/About/About";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Teacher from "../pages/Teacher/Teacher";
import AdmissionForm from "../pages/AdmissionForm/AdmissionForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  //Dashboard Layout routing 
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/teacher",
        element: <Teacher />,
      },
      {
        path: "/dashboard/admission-form",
        element: <AdmissionForm />,
      },
      
    ],
  },
]);
