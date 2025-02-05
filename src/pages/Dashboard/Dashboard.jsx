// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [classOne, setClassOne] = useState(0);
  const [classTwo, setClassTwo] = useState(0);
  const [classThree, setClassThree] = useState(0);
  const [classMaqtab, setClassMaqtab] = useState(0);

  const fetchTeacher = async () => {
    await axios
      .get("http://localhost:5000/teachers")
      .then((response) => {
        // Assuming response.data is an array of teachers
        console.log("res", response.data.length);
        setTeacherCount(response.data.length);
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  };

  const fetchStudent = async () => {
    await axios
      .get("http://localhost:5000/admission-form")
      .then((response) => {
        // Assuming response.data is an array of student admission forms
        setStudentCount(response.data.length);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const fetchClass = async (type) => {
    await axios
      .get(`http://localhost:5000/admission-form/class?class=${type}`)
      .then((response) => {
        switch (type) {
          case "One":
            setClassOne(response.data.length);
            break;
          case "Two":
            setClassTwo(response.data.length);
            break;
          case "Three":
            setClassThree(response.data.length);
            break;
          case "Maqtab":
            setClassMaqtab(response.data.length);
            break;
        }

        // setClassOne(response.data.length);
      });
  };

  useEffect(() => {
    // Fetch teachers and count them
    fetchTeacher();
    // Fetch admission forms (students) and count them
    fetchStudent();
    // Fetch different Class student
    fetchClass("One");
    fetchClass("Two");
    fetchClass("Three");
    fetchClass("Maqtab");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Filter Section */}
      <div className="mb-8">
        <label
          htmlFor="yearFilter"
          className="block text-lg font-semibold mb-2"
        >
          Filter Year:
        </label>
        <input
          id="yearFilter"
          type="text"
          placeholder="2023 to 2050"
          className="py-2 px-4 border border-focusInput rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Teachers */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Total Teachers</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {teacherCount || "0"}
          </p>
        </div>

        {/* Total Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Total Students</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {studentCount || "0"}
          </p>
        </div>

        {/* Total Classes */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Total Classes</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">04</p>
        </div>

        {/* Class One Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">
            Class One Total Students
          </h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {classOne || "0"}
          </p>
        </div>

        {/* Class Two Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">
            Class Two Total Students
          </h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {classTwo || "0"}
          </p>
        </div>

        {/* Class Three Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">
            Class Three Total Students
          </h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {classThree || "0"}
          </p>
        </div>

        {/* Class 4 (Maqtab) Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">
            Class (4) + Maqtab Total Students
          </h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {classMaqtab || "0"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
