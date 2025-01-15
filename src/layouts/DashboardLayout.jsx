/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaBars, FaWpforms } from "react-icons/fa";

import { RxCross2 } from "react-icons/rx";
import { PiChalkboardTeacher, PiStudentBold } from "react-icons/pi";

import { Link, Outlet, useLocation } from "react-router-dom";
import { GrCertificate } from "react-icons/gr";

import { TbHomeUp } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r z-10 from-orange-100 to-primary text-white p-4 flex justify-between items-center shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/school_logo.svg"
              alt="Natidanga School Logo"
              className="h-12 w-12 object-cover" // Adjust height and width as needed
            />
            <span className="text-primary text-xl font-semibold ml-2">
              Natidanga School
            </span>
          </Link>
        </div>
        <div className="md:hidden">
          {isSidebarOpen ? (
            <button className="btn bg-white text-primary" onClick={toggleSidebar}>
              <RxCross2 />
            </button>
          ) : (
            <button className="btn bg-white text-primary" onClick={toggleSidebar}>
              <FaBars />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-primary text-white w-64 p-6 md:p-10 fixed bottom-0 top-20 md:top-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-50 `}
        >
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    isActive("/dashboard")
                      ? "bg-white text-gray-800"
                      : "hover:bg-white hover:text-gray-800"
                  }`}
                >
                  <TbHomeUp className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/teacher"
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    isActive("/dashboard/teacher")
                      ? "bg-white text-gray-800"
                      : "hover:bg-white hover:text-gray-800"
                  }`}
                >
                  <PiChalkboardTeacher className="text-lg" />
                  <span>Teacher</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admission-form"
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    isActive("/dashboard/admission-form")
                      ? "bg-white text-gray-800"
                      : "hover:bg-white hover:text-gray-800"
                  }`}
                >
                  <FaWpforms className="text-lg" />
                  <span>Admission Form</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/all-students"
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    isActive("/dashboard/all-students")
                      ? "bg-white text-gray-800"
                      : "hover:bg-white hover:text-gray-800"
                  }`}
                >
                  <PiStudentBold className="text-lg" />
                  <span>All Students</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/all-certificates"
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    isActive("/dashboard/all-certificates")
                      ? "bg-white text-gray-800"
                      : "hover:bg-white hover:text-gray-800"
                  }`}
                >
                  <GrCertificate className="text-lg" />
                  <span>All Certificates</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    isActive("/")
                      ? "bg-white text-gray-800"
                      : "hover:bg-white hover:text-gray-800"
                  }`}
                >
                  <BiLogOut className="text-lg" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
