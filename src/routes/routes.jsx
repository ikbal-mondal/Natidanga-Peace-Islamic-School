import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage";
import About from "./../pages/About/About";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Teacher from "../pages/Teacher/Teacher";
import AdmissionForm from "../pages/AdmissionForm/AdmissionForm";
import AllStudents from "../pages/AllStudents/AllStudents";
import AllCertificates from "../pages/AllCertificates/AllCertificates";
import SingleStudent from "../pages/AllStudents/SingleStudent";
import StudentResult from "../pages/AllStudents/StudentResult";
import ViewCertificate from './../pages/AllCertificates/ViewCertificate';

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
      {
        path: "/dashboard/all-students",
        element: <AllStudents />,
      },
      {
        path: "/dashboard/all-students/:id",
        element: <SingleStudent />,
      },
      {
        path: "/dashboard/all-students/student-results/:id",
        element: <StudentResult />,
      },
      {
        path: "/dashboard/all-students/view-certificate/:id",
        element: <ViewCertificate />,
      },
      {
        path: "/dashboard/all-certificates",
        element: <AllCertificates />,
      },
      
    ],
  },
]);
