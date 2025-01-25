import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ViewCertificate = () => {
  const [studentReport, setStudentReport] = useState([]); // Student details
  const [student, setStudent] = useState({}); // Student details
  const [reportType, setReportType] = useState(""); // Selected report type
  const [results, setResults] = useState({}); // Results for subjects
  const [loading, setLoading] = useState(false); // Loading state

  const { id } = useParams(); // Student ID from the route
  console.log(id);

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

  console.log("Student info :", student);

  const fetchStudentReportAll = async () => {
    const response = await axios.get(
      `http://localhost:5000/student-results-all/${id}`
    );
    setStudentReport(response.data.map((result) => result?.results));
    console.log("Student Report all", response.data);
  };
  console.log("----", studentReport);

  // Fetch specific type report
  // const fetchTypeReport = async (type)=>{
  //   // api example : GET http://localhost:5000/student-results/report?id=2&reportType="halfYearReport"
  //   const response = await axios.get(`http://localhost:5000/student-results/report?id=${id}&reportType=${type}`);
  //   console.log("Repoet type",response.data)
  // }
  // fetchTypeReport("Half Year Report");

  // Fetch student all report

  useEffect(() => {
    fetchStudent();
    fetchStudentReportAll();
  }, [id]); // Fetches student details when `id` changes

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: "Certificate",
    contentRef: componentRef,
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8 bg-gray-50 min-h-screen">
      <div
        ref={componentRef}
        className="flex flex-col w-full max-w-5xl bg-white shadow-lg rounded-lg p-4 md:p-8"
      >
        <div className="border border-base p-4 md:p-8">
          <h1 className="text-base md:text-lg font-bold text-center">
            <div className="mb-3">
              <span className="inline-block border border-gray-950 px-2 py-1 rounded-md">
                প্রগতি পত্র
              </span>
            </div>
            <span className="text-xl md:text-3xl">
              নতিডাঙ্গা পিস ইসলামিক স্কুল
            </span>
          </h1>
          <div className="text-center mb-3 text-sm md:text-base">
            <p>সাং ও পোস্ট - হতিডাঙ্গা * থানা - ধানারপাড়া * জেলা - নদীয়া</p>
            <p>
              স্থাপিত - ২০২৩ <br className="my-1" /> শিক্ষাবর্ষ -{" "}
              {student?.admissionYear}
            </p>
          </div>

          <div className="text-left mb-6 flex justify-between text-sm md:text-base">
            নামঃ
            <p className="ml-1 mr-4 border-b-2 border-dotted border-black grow-[7]">
              {student?.fullName}
            </p>
            
            শ্রেণিঃ
            <p className="ml-1 mr-2 border-b-2 border-dotted border-black grow-[1]">
              {student?.class}
            </p>
            রোল নংঃ
            <p className="ml-1 mr-2 border-b-2 border-dotted border-black grow-[1]">
              {student?.rollNumber}
            </p>
          </div>

          {/* Responsive Table */}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="border border-black px-2 py-3">বিষয়</th>
                  <th className="border border-black px-2 py-3">আরবি</th>
                  <th className="border border-black px-2 py-3">দু'আ</th>
                  <th className="border border-black px-2 py-3">হাদিস</th>
                  <th className="border border-black px-2 py-3">আকাইদ</th>
                  <th className="border border-black px-2 py-3">বাংলা</th>
                  <th className="border border-black px-2 py-3">ইংরেজি</th>
                  <th className="border border-black px-2 py-3">গণিত</th>
                  <th className="border border-black px-2 py-3">কর্মশিক্ষা</th>
                  <th className="border border-black px-2 py-3">মোট নম্বর</th>
                  <th className="border border-black px-2 py-3">গড় নম্বর</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-2">পূর্ণমান</td>
                  <td className="border border-black px-2 py-2">100</td>
                  <td className="border border-black px-2 py-2">100</td>
                  <td className="border border-black px-2 py-2">100</td>
                  <td className="border border-black px-2 py-2">100</td>
                  <td className="border border-black px-2 py-2">100</td>
                  <td className="border border-black px-2 py-2">100</td>
                  <td className="border border-black px-2 py-2">100</td>
                  <td className="border border-black px-2 py-2">50</td>
                  <td className="border border-black px-2 py-2">850</td>
                  <td className="border border-black px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">
                    অর্ধ বার্ষিক পরীক্ষা
                  </td>
                  <td className="border border-black px-2 py-4">82</td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td rowSpan={2} className="border border-black px-2 py-1">
                    445
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">
                    বার্ষিক পরীক্ষা
                  </td>
                  <td className="border border-black px-2 py-4">75</td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                  <td className="border border-black px-2 py-4"></td>
                </tr>
                <tr>
                  <td
                    colSpan="9"
                    className="border border-black px-2 py-3 text-left"
                  >
                    মূল্যায়নঃ-
                  </td>
                  <td
                    colSpan="2"
                    className="border text-left border-black px-2 py-3"
                  >
                    মোট প্রাপ্ত নাম্বার : 550
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-16 text-sm md:text-base">
            <p>শ্রেণি শিক্ষকের স্বাক্ষর</p>
            <p>প্রধান শিক্ষকের স্বাক্ষর</p>
            <p>অভিভাবকের স্বাক্ষর</p>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-32">
        <button
          onClick={handlePrint}
          className="px-4 py-2 text-white bg-primary hover:bg-white border border-primary hover:border-primary hover:text-primary transition duration-300"
        >
          Print Certificate
        </button>
      </div>
    </div>
  );
};

export default ViewCertificate;
