import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ViewCertificate = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: "Certificate",
    contentRef: componentRef,
  });
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
              স্থাপিত - ২০২৩ <br className="my-1" /> শিক্ষাবর্ষ - ২০২৪ - ২০২৫
            </p>
          </div>

          <div className="text-left mb-6 flex justify-between text-sm md:text-base">
            <p className="mb-4">
              নামঃ
              ..............................................................
            </p>
            <p className="mb-4">
              শ্রেণিঃ
              ..............................................................
            </p>
            <p className="mb-4">
              রোল নংঃ
              ..............................................................
            </p>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-center text-xs md:text-sm">
              <thead>
                <tr>
                  <th className="border border-black px-2 py-1">বিষয়</th>
                  <th className="border border-black px-2 py-1">আরবি</th>
                  <th className="border border-black px-2 py-1">দু'আ</th>
                  <th className="border border-black px-2 py-1">হাদিস</th>
                  <th className="border border-black px-2 py-1">আকাইদ</th>
                  <th className="border border-black px-2 py-1">বাংলা</th>
                  <th className="border border-black px-2 py-1">ইংরেজি</th>
                  <th className="border border-black px-2 py-1">গণিত</th>
                  <th className="border border-black px-2 py-1">কর্মশিক্ষা</th>
                  <th className="border border-black px-2 py-1">মোট নম্বর</th>
                  <th className="border border-black px-2 py-1">গড় নম্বর</th>
                </tr>
              </thead>
             
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1">পূর্ণমান</td>
                  <td className="border border-black px-2 py-1">100</td>
                  <td className="border border-black px-2 py-1">100</td>
                  <td className="border border-black px-2 py-1">100</td>
                  <td className="border border-black px-2 py-1">100</td>
                  <td className="border border-black px-2 py-1">100</td>
                  <td className="border border-black px-2 py-1">100</td>
                  <td className="border border-black px-2 py-1">100</td>
                  <td className="border border-black px-2 py-1">50</td>
                  <td className="border border-black px-2 py-1">850</td>
                  <td className="border border-black px-2 py-1">85</td>
                </tr>
              </tbody>
            
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1">
                    অর্ধ বার্ষিক পরীক্ষা
                  </td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                </tr>
              </tbody>
            
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1">
                    বার্ষিক পরীক্ষা
                  </td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                </tr>
              </tbody>
           
            </table>
          </div>

          <div className="mt-6 text-sm md:text-base">
            <p>
              মূল্যায়নঃ
              .........................................................
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-8 text-sm md:text-base">
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
