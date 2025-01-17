import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const SingleStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [editedStudent, setEditedStudent] = useState({}); // For editing

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/admission-form/${id}`
      );
      setStudent(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleEdit = () => {
    setEditedStudent(student);
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      console.log(editedStudent)
      // eslint-disable-next-line no-unused-vars
      const { _id, ...editStudentWOId } = editedStudent; // Object distructure without _id
      const response = await axios.put(
        `http://localhost:5000/admission-form/${id}`,
        editStudentWOId, // Send only the properties needed for update
      );
      fetchStudent();
      setStudent(response.data); // Update the student state with the latest data
      setIsModalOpen(false);

      toast.success("Student form updated successfully", {
        position: "top-center",
        duration: 2000,
        style: {
          marginTop: "20vh", // 10% of the viewport height
        },
      });
      
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!student) return <p>Loading student data...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Student Details</h2>
      <div className="flex flex-col md:grid grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="col-span-8">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Student Details
            </h3>
            <ul className="divide-y divide-gray-200">
              {Object.entries(student).map(([key, value]) =>
                key !== "_id" ? ( // Exclude ID from display
                  <li key={key} className="py-3 flex justify-between">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {value || "N/A"}
                    </span>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600">
            Add Roll Number
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600">
            Add Result Report
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600">
            View Certificate
          </button>
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">Edit Student</h3>
            <form className="space-y-4">
              <div
                className="overflow-y-auto max-h-[400px] px-3" // Scrollable area
              >
                {Object.keys(student).map((key) =>
                  key !== "_id" ? ( // Exclude ID from modal fields
                    <div key={key}>
                      <label className="block text-sm mt-3 mb-1 font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1")} :
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={editedStudent[key] || ""}
                        onChange={handleModalChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  ) : null
                )}
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
