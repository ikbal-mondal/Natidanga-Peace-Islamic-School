// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdmissionForm = () => {
  const classList = ["One", "Two", "Three", "Maqtab"];
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dateOfBirth: "",
    aadharNumber: "",
    village: "",
    post: "",
    thana: "",
    pincode: "",
    class: "",
    admissionFees: "",
    admissionDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:5000/admission-form", // Replace with your actual endpoint
        formData // Data to be sent to the server
      );

      console.log("Response from server", response);

      // Handle successful submission
      toast.success("Admission form added successfully", {
        position: "top-center",
        duration: 2000,
        style: {
          marginTop: "10vh", // 10% of the viewport height
          marginLeft: "70px",
        },
      });
      console.log("Response from server:", response.data);

      // Reset the form fields
      setFormData({
        fullName: "",
        fatherName: "",
        dateOfBirth: "",
        aadharNumber: "",
        village: "",
        post: "",
        thana: "",
        pincode: "",
        class: "",
        admissionFees: "",
        admissionDate: "",
      });
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">
          Student Admission Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-col lg:flex-row gap-4">
            {/* Full Name */}
            <div className="w-full lg:w-1/2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                required
              />
            </div>

            {/* Admission Year */}
            <div className="w-full lg:w-1/2">
              <label
                htmlFor="admissionYear"
                className="block text-sm font-medium text-gray-700"
              >
                Admission Year
              </label>
              <select
                id="admissionYear"
                name="admissionYear"
                value={formData.admissionYear}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                required
              >
                <option value="" disabled>
                  Select Year
                </option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>

          {/* Father Name */}
          <div>
            <label
              htmlFor="fatherName"
              className="block text-sm font-medium text-gray-700"
            >
              Father Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              className="mt-1  w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
              required
            />
          </div>

          {/* Aadhar Number */}
          <div>
            <label
              htmlFor="aadharNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
              required
            />
          </div>

          {/* Address: Village, Post, Thana, Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="village"
                className="block text-sm font-medium text-gray-700"
              >
                Village
              </label>
              <input
                type="text"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                required
              />
            </div>
            <div>
              <label
                htmlFor="post"
                className="block text-sm font-medium text-gray-700"
              >
                Post
              </label>
              <input
                type="text"
                id="post"
                name="post"
                value={formData.post}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                required
              />
            </div>
            <div>
              <label
                htmlFor="thana"
                className="block text-sm font-medium text-gray-700"
              >
                Thana
              </label>
              <input
                type="text"
                id="thana"
                name="thana"
                value={formData.thana}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                required
              />
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700"
              >
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                required
              />
            </div>
          </div>

          {/* Class */}
          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-gray-700"
            >
              Class
            </label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
              required
            >
              <option value="" disabled>
                Select a class
              </option>
              {classList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Admission Fees */}
          <div>
            <label
              htmlFor="admissionFees"
              className="block text-sm font-medium text-gray-700"
            >
              Admission Fees Amount
            </label>
            <input
              type="number"
              id="admissionFees"
              name="admissionFees"
              value={formData.admissionFees}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
              required
            />
          </div>

          {/* Admission Date */}
          <div>
            <label
              htmlFor="admissionDate"
              className="block text-sm font-medium text-gray-700"
            >
              Admission Date
            </label>
            <input
              type="date"
              id="admissionDate"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white hover:text-primary hover:bg-white transition-all duration-150 ease-in-out py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 relative group overflow-hidden"
            >
              Submit Admission
              <span className="absolute bottom-0  left-1/2 w-0 h-[2px] bg-primary transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
