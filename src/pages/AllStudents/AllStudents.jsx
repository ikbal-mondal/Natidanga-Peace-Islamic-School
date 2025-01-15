// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const AllStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const [deleteAdmissionId, setDeleteAdmissionId] = useState(null); // Track teacher to delete

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Fetch students from the API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/admission-form");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data); // Initially, show all students
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 

  // Handle search and filter logic
  const handleSearchAndFilters = () => {
    const query = searchQuery.toLowerCase();
    const selectedClass = filterClass.toLowerCase();
    const selectedYear = filterYear.toLowerCase();

    const results = students.filter((student) => {
      const matchesSearchQuery =
        student.fullName?.toLowerCase().includes(query) ||
        student.fatherName?.toLowerCase().includes(query) ||
        student.roll?.toString().includes(query);

      const matchesClass =
        !selectedClass || student.class?.toLowerCase() === selectedClass;
      const matchesYear =
        !selectedYear || student.admissionYear?.toString() === selectedYear;

      return matchesSearchQuery && matchesClass && matchesYear;
    });

    setFilteredStudents(results);
    setCurrentPage(1); // Reset to the first page on new search or filter
  };

  // Trigger search and filter on input change
  useEffect(() => {
    handleSearchAndFilters();
  }, [searchQuery, filterClass, filterYear]);

  // Calculate the current page's students
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle delete confirmation
  const confirmDelete = (id) => {
    setDeleteAdmissionId(id); // Set the teacher to delete
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-3 md:p-6 bg-gray-100">
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 shadow rounded-lg">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-wrap items-center gap-2 w-full md:w-1/2"
        >
          <input
            type="text"
            placeholder="Enter Name Or Father Name Or Roll"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-sky-600"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2">
          <label className="text-gray-600 font-medium">Filter Class:</label>
          <input
            type="text"
            placeholder="One, Two, Three, Maktab"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600 font-medium">Filter Year:</label>
          <input
            type="text"
            placeholder="2023 to 2050"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
        </div>
      </div>

      {/* Students List */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          All Students List
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredStudents.length > 0 ? (
          <>
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Class</th>
                  <th className="p-4 text-left">Roll</th>
                  <th className="p-4 text-left">Dues</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="p-4">{student.fullName}</td>
                    <td className="p-4">{student.class}</td>
                    <td className="p-4">{student.roll ?? "N/A"}</td>
                    <td className="p-4">{student.dues ?? "N/A"}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        View Details
                      </button>
                      <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center gap-2">
            <div
                className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  currentPage === 1
                    ? "bg-gray-300"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`flex items-center justify-center gap-2 ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700"
                  }`}
                  disabled={currentPage === 1}
                >
                  <GrFormPreviousLink
                    className={`text-lg mt-[2px] ${
                      currentPage === 1 ? "text-gray-400" : "text-gray-700"
                    }`}
                  />
                  Previous
                </button>
              </div>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <div
                className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center gap-2 ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700"
                  }`}
                >
                  Next
                  <GrFormNextLink
                  className={`text-lg mt-[2px] ${
                    currentPage === totalPages
                      ? "text-gray-400"
                      : "text-gray-700"
                  }`}
                />
                </button>
                
              </div>
            </div>
          </>
        ) : (
          <h3 className="text-center text-2xl text-error">
            No students found.
          </h3>
        )}
      </div>
    </div>
  );
};

export default AllStudents;
