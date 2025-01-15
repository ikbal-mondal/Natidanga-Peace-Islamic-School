// eslint-disable-next-line no-unused-vars
import React from 'react';


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Filter Section */}
      <div className="mb-8">
        <label htmlFor="yearFilter" className="block text-lg font-semibold mb-2">
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
          <p className="text-3xl font-bold text-gray-800 mt-2">03</p>
        </div>

        {/* Total Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Total Students</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">75</p>
        </div>

        {/* Total Classes */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Total Classes</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">05</p>
        </div>

        {/* Class One Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Class One Total Students</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">17</p>
        </div>

        {/* Class Two Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Class Two Total Students</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
        </div>

        {/* Class Three Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">Class Three Total Students</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">13</p>
        </div>

        {/* Class 4 (Maqtab) Students */}
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-gray-500 text-lg font-medium">
            Class (4) + Maqtab Total Students
          </h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">47</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
