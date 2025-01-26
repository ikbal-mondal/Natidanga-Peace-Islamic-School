import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ViewCertificate = () => {
  // State to store fetched student report and student data
  const [studentReport, setStudentReport] = useState([]);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  // Accessing the `id` parameter from the URL
  const { id } = useParams();

  // Ref for printing the component
  const componentRef = useRef();

  // Fetch data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loading indicator
      try {
        // Fetching student details and report data in parallel
        const [studentRes, reportRes] = await Promise.all([
          axios.get(`http://localhost:5000/admission-form/${id}`),
          axios.get(`http://localhost:5000/student-results-all/${id}`),
        ]);
        setStudent(studentRes.data); // Set student data
        setStudentReport(reportRes.data.map((result) => result?.results)); // Extract report data
      } catch (err) {
        // Handle fetch error
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };
    fetchData();
  }, [id]);

  // Setup for printing the certificate
  const handlePrint = useReactToPrint({
    documentTitle: "Certificate",
    contentRef: componentRef,
  });

  // Destructure the report data into half-year and annual reports
  const [halfYearReport, annualReport] = studentReport;

  // Helper function to calculate the total marks
  const calculateTotal = (report) =>
    report ? Object.values(report).reduce((sum, value) => sum + parseInt(value), 0) : 0;

  const halfYearTotal = calculateTotal(halfYearReport); // Half-year total marks
  const annualTotal = calculateTotal(annualReport); // Annual total marks
  const averageTotal = ((halfYearTotal + annualTotal) / 2).toFixed(2); // Average marks

  if (loading) return <p>Loading...</p>; // Show loading message during fetch

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Printable certificate content */}
      <div ref={componentRef} className="flex flex-col w-full max-w-5xl bg-white shadow-lg rounded-lg p-4 md:p-8">
        <div className="border border-base p-4 md:p-8">
          {/* Header section */}
          <h1 className="text-base md:text-lg font-bold text-center">
            <div className="mb-3">
              <span className="inline-block border border-gray-950 px-2 py-1 rounded-md">প্রগতি পত্র</span>
            </div>
            <span className="text-xl md:text-3xl">নতিডাঙ্গা পিস ইসলামিক স্কুল</span>
          </h1>
          <div className="text-center mb-3 text-sm md:text-base">
            <p>সাং ও পোস্ট - হতিডাঙ্গা * থানা - ধানারপাড়া * জেলা - নদীয়া</p>
            <p>
              স্থাপিত - ২০২৩ <br className="my-1" /> শিক্ষাবর্ষ - {student?.admissionYear}
            </p>
          </div>

          {/* Student details */}
          <div className="text-left mb-6 flex justify-between text-sm md:text-base">
            নামঃ
            <p className="ml-1 mr-4 border-b-2 border-dotted border-black grow-[7]">{student?.fullName}</p>
            শ্রেণিঃ
            <p className="ml-1 mr-2 border-b-2 border-dotted border-black grow-[1]">{student?.class}</p>
            রোল নংঃ
            <p className="ml-1 mr-2 border-b-2 border-dotted border-black grow-[1]">{student?.rollNumber}</p>
          </div>

          {/* Results table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-center">
              <thead>
                <tr>
                  <th className="border border-black px-2 py-3">বিষয়</th>
                  {(halfYearReport || annualReport) &&
                    Object.keys(halfYearReport).map((key) => (
                      <th key={key} className="border border-black px-2 py-3">
                        {key}
                      </th>
                    ))}
                  <th className="border border-black px-2 py-3">মোট নম্বর</th>
                  <th className="border border-black px-2 py-3">গড় নম্বর</th>
                </tr>
              </thead>
              <tbody>
                {/* Full marks row */}
                <tr>
                  <td className="border border-black px-2 py-2">পূর্ণমান</td>
                  {(halfYearReport || annualReport) &&
                    Object.keys(halfYearReport).map((key) => (
                      <td key={key} className="border border-black px-2 py-2">
                        {key === "কর্মশিক্ষা" ? 50 : 100}
                      </td>
                    ))}
                  <td className="border border-black px-2 py-2">{student?.class === "Maqtab" ? 450 : 850}</td>
                  <td className="border border-black px-2 py-2"></td>
                </tr>

                {/* Half-yearly exam row */}
                <tr>
                  <td className="border border-black px-2 py-1">অর্ধ বার্ষিক পরীক্ষা</td>
                  {halfYearReport &&
                    Object.values(halfYearReport).map((value, i) => (
                      <td key={i} className="border border-black px-2 py-4">
                        {parseInt(value)}
                      </td>
                    ))}
                  <td className="border border-black px-2 py-4">{halfYearTotal}</td>
                  <td rowSpan={annualReport ? 2 : 1} className="border border-black px-2 py-1">
                    {averageTotal}
                  </td>
                </tr>

                {/* Annual exam row (if available) */}
                {annualReport && (
                  <tr>
                    <td className="border border-black px-2 py-1">বার্ষিক পরীক্ষা</td>
                    {Object.values(annualReport).map((value, i) => (
                      <td key={i} className="border border-black px-2 py-4">
                        {parseInt(value)}
                      </td>
                    ))}
                    <td className="border border-black px-2 py-4">{annualTotal}</td>
                  </tr>
                )}

                {/* Evaluation row */}
                <tr>
                  <td colSpan={(halfYearReport || annualReport) && Object.keys(halfYearReport).length + 1} className="border border-black px-2 py-3 text-left">
                    মূল্যায়নঃ-
                  </td>
                  <td colSpan="2" className="border text-center border-black px-2 py-3">
                    মোট প্রাপ্ত নাম্বার : {halfYearTotal + annualTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="flex flex-col sm:flex-row justify-between mt-16 text-sm md:text-base">
            <p>শ্রেণি শিক্ষকের স্বাক্ষর</p>
            <p>প্রধান শিক্ষকের স্বাক্ষর</p>
            <p>অভিভাবকের স্বাক্ষর</p>
          </div>
        </div>
      </div>

      {/* Print button */}
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
