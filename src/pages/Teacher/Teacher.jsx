// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const TeacherComponent = () => {
  const [teachers, setTeachers] = useState([]); // State to store teacher details
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setTeachers([...teachers, { ...formData, id: Date.now() }]);
    setFormData({ name: "", phone: "", email: "" });
    setShowModal(false);
  };

  // Handle editing teacher details
  const handleEdit = (id) => {
    const teacherToEdit = teachers.find((teacher) => teacher.id === id);
    setFormData(teacherToEdit);
    setShowModal(true);
    setTeachers(teachers.filter((teacher) => teacher.id !== id)); // Remove the old entry to replace
  };

  // Handle deleting teacher details
  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10">
      {/* Add Teacher Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-pink-500 text-white py-2 px-4 rounded shadow hover:bg-primary flex items-center gap-2"
        >
          <FaPlus className="text-white" /> Add Teacher
        </button>
      </div>

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
              <tr key={teacher.id} className="border-t">
                <td className="py-2 px-4">{teacher.name}</td>
                <td className="py-2 px-4">{teacher.phone}</td>
                <td className="py-2 px-4">{teacher.email}</td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(teacher.id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>
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
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:ring focus:ring-blue-200"
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
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:ring focus:ring-blue-200"
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
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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

export default TeacherComponent;
