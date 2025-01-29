import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ViewCertificate = () => {
  // State to store fetched student report and student data
  // State variables
  const [studentReport, setStudentReport] = useState([]); // Store student report
  const [student, setStudent] = useState({}); // Store student details
  const [loading, setLoading] = useState(false); // Loading state
  const [halfYearReport, setHalfYearReport] = useState({}); // Half-yearly report
  const [annualReport, setAnnualReport] = useState({}); // Annual report

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

        // Organize reports into half-yearly and annual
        reportRes.data.map((report) => {
          if (report.reportType === "Half Year Report") {
            setHalfYearReport(report.results);
          }
          if (report.reportType === "Annual Report") {
            setAnnualReport(report.results);
          }
        });

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

  const halfValue = Object.values(halfYearReport);
  const halfEntris = Object.entries(halfYearReport);

  const annualValue = Object.values(annualReport);
  const annualEntris = Object.entries(annualReport);

  // Setup for printing the certificate
  const handlePrint = useReactToPrint({
    documentTitle: `${student?.fullName}'s Certificate`,
    contentRef: componentRef,
  });

  // Subjects to display
  const allHeading = [
    "বিষয়",
    "বাংলা",
    "ইংরাজি",
    "গণিত",
    "আরবী",
    "দুয়া",
    "হাদীস",
    "আকাইদ",
    "কর্মশিক্ষা",
    "মোট নম্বর",
    "গড় নম্বর",
  ];
  const filteredAllHeading =
    student.class === "Maqtab"
      ? allHeading.filter(
          (subject) => !["বাংলা", "ইংরাজি", "গণিত"].includes(subject)
        )
      : allHeading;

  const markRegular = [
    "পূর্ণমান",
    "100",
    "100",
    "100",
    "100",
    "100",
    "100",
    "100",
    "50",
    "750",
  ];
  const markMaqtab = ["পূর্ণমান", "100", "100", "100", "100", "50", "450"];

  const showMark = student.class === "Maqtab" ? markMaqtab : markRegular;

  // Helper function to calculate the total marks
  const calculateTotal = (report) =>
    report
      ? report.reduce((sum, value) => {
          // Convert the value to a number, and check if it's valid
          const num = parseFloat(value);
          return isNaN(num) ? sum : sum + num; // If valid, add it to the sum
        }, 0)
      : 0;

  const halfYearTotal = calculateTotal(halfValue); // Half-year total marks
  const annualTotal = calculateTotal(annualValue); // Annual total marks

  console.log("half report", halfYearReport);
  console.log("half result value", halfValue);

  // Helper function to calculate the percentage
  const calculatePercentage = (obtainedValue, totalValue) => {
    if (totalValue === 0) return "N/A";
    return ((obtainedValue / totalValue) * 100).toFixed(2);
  };

  // Determine total marks based on class type
  const totalMarks = student?.class === "Maqtab" ? 450 : 750;
  const percentage = calculatePercentage(
    halfYearTotal + annualTotal,
    totalMarks
  );

  // Ensure "কর্মশিক্ষা" marks are properly handled
  const subject = "কর্মশিক্ষা";
  const chishiMark = annualReport?.[subject] || "N/A";

  if (loading) return <p>Loading...</p>; // Show loading message during fetch

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Printable certificate content */}
      <div
        ref={componentRef}
        className="flex flex-col w-full max-w-5xl bg-white shadow-lg rounded-lg p-4 md:p-8"
      >
        <div className="border border-base p-4 md:p-8">
          {/* Header section */}
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

          {/* Student details */}
          <div className="text-center mb-6 flex justify-between font-medium text-base md:text-xl">
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

          {/* Results table */}
          <div className="overflow-x-auto">
            {halfEntris.length !== 0 || annualEntris.length !== 0 ? (
              <table className="w-full border-collapse border border-black text-center">
                <thead>
                  <tr>
                    {filteredAllHeading.map((key) => (
                      <th key={key} className="border border-black px-2 py-3">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Full marks row */}
                  <tr>
                    {showMark.map((value, i) => (
                      <td key={i} className="border border-black px-2 py-2">
                        {value}
                      </td>
                    ))}
                  </tr>

                  {/* Half-yearly exam row */}
                  {halfValue.length !== 0 ? (
                    <tr>
                      <td className="border border-black px-2 py-1">
                        অর্ধ বার্ষিক পরীক্ষা
                      </td>
                      {halfValue.map((value, i) => (
                        <td key={i} className="border border-black px-2 py-4">
                          {isNaN(parseFloat(value)) ? "Not Attend To Exam" : value}
                        </td>
                      ))}
                      <td rowSpan={2} className="border border-black px-2 py-4">
                        {chishiMark}
                      </td>
                      <td className="border border-black px-2 py-4">
                        {halfYearTotal}
                      </td>
                      <td
                        rowSpan={annualReport ? 2 : 1}
                        className="border border-black px-2 py-1"
                      >
                        {percentage}%
                      </td>
                    </tr>
                  ) : student.class === "Maqtab" ? (
                    <tr>
                      <td className="border border-black px-2 py-1">
                        অর্ধ বার্ষিক পরীক্ষা
                      </td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>

                      <td rowSpan={2} className="border border-black px-2 py-4">
                        {chishiMark}
                      </td>
                      <td className="border border-black px-2 py-4">
                        {halfYearTotal}
                      </td>
                      <td
                        rowSpan={annualReport ? 2 : 1}
                        className="border border-black px-2 py-1"
                      >
                        {percentage}%
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="border border-black px-2 py-1">
                        অর্ধ বার্ষিক পরীক্ষা
                      </td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td rowSpan={2} className="border border-black px-2 py-4">
                        {chishiMark}
                      </td>
                      <td className="border border-black px-2 py-4">
                        {halfYearTotal}
                      </td>
                      <td
                        rowSpan={annualReport ? 2 : 1}
                        className="border border-black px-2 py-1"
                      >
                        {percentage}%
                      </td>
                    </tr>
                  )}

                  {/* Annual exam row (if available) */}
                  {annualValue.length !== 0 ? (
                    <tr>
                      <td className="border border-black px-2 py-1">
                        বার্ষিক পরীক্ষা
                      </td>
                      {annualEntris.map(
                        ([key, value], i) =>
                          key !== "কর্মশিক্ষা" && (
                            <td
                              key={i}
                              className="border border-black px-2 py-4"
                            >
                               {isNaN(parseFloat(value)) ? "Not Attend" : value}
                            </td>
                          )
                      )}
                      <td className="border border-black px-2 py-4">
                        {annualTotal}
                      </td>
                    </tr>
                  ) : student.class === "Maqtab" ? (
                    <tr>
                      <td className="border border-black px-2 py-1">
                        বার্ষিক পরীক্ষা
                      </td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="border border-black px-2 py-1">
                        বার্ষিক পরীক্ষা
                      </td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                      <td className="border border-black px-2 py-4"></td>
                    </tr>
                  )}

                  {/* Evaluation row */}
                  <tr>
                    <td
                      colSpan={
                        halfValue.length !== 0
                          ? halfValue.length + 2
                          : annualValue.length + 2
                      }
                      className="border border-black px-2 py-3 text-left"
                    >
                      মূল্যায়নঃ-
                    </td>
                    <td
                      colSpan="2"
                      className="border text-center border-black px-2 py-3"
                    >
                      মোট প্রাপ্ত নাম্বার : {halfYearTotal + annualTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
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
                    <th className="border border-black px-2 py-3">
                      কর্মশিক্ষা
                    </th>
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
                    <td className="border border-black px-2 py-2">750</td>
                    <td className="border border-black px-2 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      অর্ধ বার্ষিক পরীক্ষা
                    </td>
                    <td className="border border-black px-2 py-4"></td>
                    <td className="border border-black px-2 py-4"></td>
                    <td className="border border-black px-2 py-4"></td>
                    <td className="border border-black px-2 py-4"></td>
                    <td className="border border-black px-2 py-4"></td>
                    <td className="border border-black px-2 py-4"></td>
                    <td className="border border-black px-2 py-4"></td>
                    <td
                      rowSpan={2}
                      className="border border-black px-2 py-4"
                    ></td>
                    <td className="border border-black px-2 py-4"></td>
                    <td
                      rowSpan={2}
                      className="border border-black px-2 py-1"
                    ></td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      বার্ষিক পরীক্ষা
                    </td>
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
                      মোট প্রাপ্ত নাম্বার :
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
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
