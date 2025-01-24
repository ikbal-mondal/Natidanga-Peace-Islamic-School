import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const StudentResult = () => {
  const { id } = useParams(); // Student ID from the route
  const [student, setStudent] = useState(null); // Student details
  const [studentReport, setStudentReport] = useState([]); // Student details
  const [reportType, setReportType] = useState(""); // Selected report type
  const [results, setResults] = useState({}); // Results for subjects
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch student details
  const fetchStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/admission-form/${id}`
      );
      setStudent(response.data);
    } catch (err) {
      toast.error("Failed to fetch student details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific type report
  const fetchTypeReport = async (type)=>{
    // api example : GET http://localhost:5000/student-results/report?id=2&reportType="halfYearReport"
    const response = await axios.get(`http://localhost:5000/student-results/report?id=${id}&reportType=${type}`);
    console.log("Repoet type",response.data)
  }

  // Fetch student all report
  const fetchStudentReportAll = async ()=>{
    const response = await axios.get(`http://localhost:5000/student-results-all/${id}`);
    setStudentReport(response.data);
    console.log("Student Report all",response.data)
  }
  const allReportType = studentReport.map(report => report.reportType);

  useEffect(() => {
    fetchStudent();
    fetchTypeReport("Half Year Report");
    fetchStudentReportAll();
  }, [id]); // Fetches student details when `id` changes

  // Handle subject result input
  const handleInputChange = (e, subject) => {
    setResults((prev) => ({ ...prev, [subject]: e.target.value }));
  };

  // Handle report submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!reportType) {
      toast.error("Please select a report type", {
        position: "top-center",
        duration: 2000,
        style: {
          marginTop: "10vh", // 10% of the viewport height
        },
      });
      return;
    }

    try {
      const payload = {
        studentId: id,
        reportType,
        results,
      };
      await axios.post("http://localhost:5000/student-results", payload);
      fetchStudentReport();
      setResults({});
      toast.success("Result report added successfully", {
        position: "top-center",
        duration: 2000,
        style: {
          marginTop: "20vh", // 10% of the viewport height
        },
      });
    } catch (err) {
      toast.error("Failed to add result report", {
        position: "top-center",
        duration: 2000,
        style: {
          marginTop: "20vh", // 10% of the viewport height
        },
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>No student data found.</p>;

  // Subjects to display
  const allSubjects = [
    "বাংলা",
    "ইংরাজি",
    "গণিত",
    "আরবী",
    "দুয়া",
    "হাদীস",
    "আকাইদ",
    "কর্মশিক্ষা",
  ];
  const filteredSubjects =
    student.class === "Maqtab"
      ? allSubjects.filter(
          (subject) => !["বাংলা", "ইংরাজি", "গণিত"].includes(subject)
        )
      : allSubjects;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Top Section */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Add Result Report for{" "}
          <span className="text-sky-600">{student.fullName}</span>
        </h2>
        <p className="text-gray-800 font-semibold text-xl my-5 md:my-0">
          Class:{" "}
          <span className="font-medium text-sky-600">{student.class}</span> |
          Roll:{" "}
          <span className="font-medium text-sky-600">
            {student.rollNumber || "N/A"}
          </span>
        </p>
      </div>

      {/* Report Type Selector */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Select Report Type
        </label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">-- Select Report Type --</option>
          <option value="Half Year Report">Half Year Report</option>
          <option value="Annual Report">Annual Report</option>
        </select>
      </div>

      {/* Result Form */}
      <div className="mb-8">
        <h3 className="text-xl font-bold my-4">Enter Results</h3>
        <form onSubmit={handleSubmit}>
          {filteredSubjects.map((subject) => (
            <div key={subject} className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                {subject}
              </label>
              <input
                type="number"
                value={results[subject] || ""}
                onChange={(e) => handleInputChange(e, subject)}
                placeholder={`Enter marks for ${subject}`}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          ))}
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
               type="submit"
              // className=" mt-3 px-6 py-2 rounded-lg hover:bg-blue-600"
              className={`mt-3  px-6 py-2 rounded-lg ${
                (allReportType.includes(reportType)) ?
                   "text-gray-600 bg-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white "
              }`}
              disabled={allReportType.includes(reportType)}
            >
              {
                allReportType.includes(reportType) ? "Already report added" :" Add Report"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentResult;
