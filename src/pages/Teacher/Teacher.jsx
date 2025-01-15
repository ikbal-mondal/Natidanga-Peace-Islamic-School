// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]); // State to store teacher details
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [deleteTeacherId, setDeleteTeacherId] = useState(null); // Track teacher to delete

  // Fetch teachers from the server
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        // eslint-disable-next-line no-unused-vars
        const { _id, ...formDataNew } = formData;
        await axios.put(
          `http://localhost:5000/teachers/${formData._id}`,
          formDataNew
        );
        toast.success("Teacher updated successfully");
      } else {
        await axios.post("http://localhost:5000/teachers", formData);
        toast.success("Teacher added successfully", {
          position: "top-center",
          duration: 2000,
          style: {
            marginTop: "20vh", // 10% of the viewport height
          },
        });
      }
      fetchTeachers();
      setFormData({ name: "", phone: "", email: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding/updating teacher:", error);
    }
  };

  // Handle edit
  const handleEdit = async (id) => {
    const response = await axios.get(`http://localhost:5000/teachers/${id}`);
    setFormData(response.data);
    setShowModal(true);
  };

  const handleCancel = () => {
    setFormData({ name: "", phone: "", email: "" });
    // Modal Close
    setShowModal(false);
  };

  // Handle delete confirmation
  const confirmDelete = (id) => {
    setDeleteTeacherId(id); // Set the teacher to delete
  };

  // Handle deleting teacher
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/teachers/${deleteTeacherId}`);
      setTeachers(
        teachers.filter((teacher) => teacher._id !== deleteTeacherId)
      );
      toast.success("Teacher deleted successfully");
      setDeleteTeacherId(null); // Clear the state
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Handle cancel deleting teacher
  const handleCancelDelete = () => {
    setDeleteTeacherId(null); // Close confirmation modal
  };

  // Fetch teachers when the component mounts
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10">
      {/* Add Teacher Button */}
      <div className="flex justify-start md:justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white py-2 px-4 rounded shadow hover:bg-primary flex items-center gap-2"
        >
          <FaPlus className="text-white" /> Add Teacher
        </button>
      </div>

      {/* Heading for Teacher Table */}
      
      <h2 className="relative text-xl md:text-2xl font-bold text-gray-800 mb-4 group inline-block">
        Teacher List
        {/* Border for hover animation */}
        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
      </h2>
     

      {/* Teacher Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone Number</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id} className="border-t">
                <td className="py-2 px-4">{teacher.name}</td>
                <td className="py-2 px-4">{teacher.phone}</td>
                <td className="py-2 px-4">{teacher.email}</td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(teacher._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(teacher._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No teachers added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {formData._id ? "Edit Teacher" : "Add Teacher"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => handleCancel()}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  {formData._id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTeacherId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this teacher?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
