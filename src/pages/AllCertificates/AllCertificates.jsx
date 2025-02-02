import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SingleCertificate from "./SingleCertificate";


const AllCertificates = () => {
 
  const [yearFilter, setYearFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState("");

  // Ref for printing the component
  const printRef = useRef();

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


  // Fetch data from API
  useEffect(() => {
    fetchStudents();
  }, []);

  console.log("students :",students)
  console.log("filter Student :",filteredStudents)


   // Handle search and filter logic
    const handleFilters = () => {
      
      const selectedClass = classFilter.toLowerCase();
      const selectedYear = yearFilter.toLowerCase();
  
      const results = students.filter((student) => {
        const matchesClass =
          !selectedClass || student.class?.toLowerCase().includes(selectedClass);
        const matchesYear =
          !selectedYear || student.admissionYear?.toString().includes(selectedYear);
  
        return matchesClass && matchesYear;
      });
  
      setFilteredStudents(results);
     
    };
  
    // Trigger search and filter on input change
    useEffect(() => {
      handleFilters();
    }, [classFilter, yearFilter]);



  // Print functionality using react-to-print
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div className="p-4 md:p-6">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap">
          {/* Filter by Year */}
          <div>
            <label className="block text-base font-medium mb-1">
              Filter By Year:
            </label>
            <input
              type="text"
              placeholder="2023 to 2050"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="border px-3 py-2 rounded w-full sm:w-auto"
            />
          </div>

          {/* Filter by Class */}
          <div>
            <label className="block text-base font-medium mb-1">
              Filter By Class:
            </label>
            <input
              type="text"
              placeholder="One, Maqtab"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="border px-3 py-2 rounded w-full sm:w-auto"
            />
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleFilters}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 sm:mt-0"
          >
            Apply Filters
          </button>
        </div>

        {/* Print All Certificates Button */}
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Print All PDF
        </button>
      </div>

      {/* Certificate Count */}
      <div className="mb-4 text-lg font-medium text-center md:text-left">
        Total Certificates: {students.length} | Current Selected:{" "}
        {filteredStudents.length}
      </div>

      {/* Certificate Display Section */}
      <div ref={printRef} className="border p-4 grid gap-4 md:gap-6 lg:gap-8">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <SingleCertificate key={student._id} id={student._id} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No certificates found</p>
        )}
      </div>
    </div>
  );
};

export default AllCertificates;
