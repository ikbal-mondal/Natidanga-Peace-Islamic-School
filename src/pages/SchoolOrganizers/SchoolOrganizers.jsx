import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const SchoolOrganizers = () => {
  const [organizers, setOrganizers] = useState([]); // State to store teacher details
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({ name: "", phone: "", email: "",role: "" });
  const [deleteOrganizerId, setDeleteOrganizerId] = useState(null); // Track teacher to delete

  // Organizer role type
  const roleList = ["Normal Member", "Secretary", "Cashier", "President","Another Member Of The School"];

    // Fetch organizers from the server
    const fetchOrganizers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/organizers");
        setOrganizers(response.data);
      } catch (error) {
        console.error("Error fetching Organizer:", error);
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
          `http://localhost:5000/organizers/${formData._id}`,
          formDataNew
        );
        toast.success("Organizer updated successfully", {
          position: "top-center",
          duration: 2000,
          style: {
            marginTop: "20vh", // 10% of the viewport height
          },
        });
      } else {
        await axios.post("http://localhost:5000/organizers", formData);
        toast.success("Organizer added successfully", {
          position: "top-center",
          duration: 2000,
          style: {
            marginTop: "20vh", // 10% of the viewport height
          },
        });
      }
      fetchOrganizers();
      setFormData({ name: "", phone: "", email: "",role: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding/updating organizer:", error);
    }
  };

    // Handle edit
    const handleEdit = async (id) => {
      const response = await axios.get(`http://localhost:5000/organizers/${id}`);
      setFormData(response.data);
      setShowModal(true);
    };

  const handleCancel = () => {
    setFormData({ name: "", phone: "", email: "",role: ""  });
    // Modal Close
    setShowModal(false);
  };

   // Handle delete confirmation
   const confirmDelete = (id) => {
    setDeleteOrganizerId(id); // Set the teacher to delete
  };

  // Handle deleting organizer
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/teachers/${deleteOrganizerId}`);
      setOrganizers(
        organizers.filter((organizer) => organizer._id !== deleteOrganizerId)
      );
      toast.success("Organizer Member deleted successfully", {
        position: "top-center",
        duration: 2000,
        style: {
          marginTop: "10vh", // 10% of the viewport height
          marginLeft: "70px",
        },
      });
      setDeleteOrganizerId(null); // Clear the state
    } catch (error) {
      console.error("Error deleting organizer:", error);
    }
  };

  // Handle cancel deleting organizer
  const handleCancelDelete = () => {
    setDeleteOrganizerId(null); // Close confirmation modal
  };


   // Fetch organizers when the component mounts
    useEffect(() => {
      fetchOrganizers();
    }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-start md:justify-end p-8 md:p-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-600 hover:bg-primary transition duration-100 ease-in-out text-white py-2 px-4 rounded shadow flex items-center gap-2"
        >
          <FaPlus className="text-white" /> Add Member
        </button>
      </div>
      {/* Heading for Organizer Table */}
      <h2 className="relative text-xl md:text-2xl font-bold text-gray-800 mb-4 group inline-block">
        Organizer List
        {/* Border for hover animation */}
        <span className="absolute top-9 left-1/2 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
      </h2>

      {/* Organizers Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 flex">
              <th className="py-2 px-4 text-left flex-1">Name</th>
              <th className="py-2 px-4 text-left flex-1">Phone</th>
              <th className="py-2 px-4 text-left flex-1">Email</th>
              <th className="py-2 px-4 text-left flex-1">Role</th>
              <th className="py-2 px-4 text-center flex-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map((organizer) => (
              <tr key={organizer._id} className="border-t flex">
                <td className="py-2 px-4 flex-1">{organizer.name || "N/A"}</td>
                <td className="py-2 px-4 flex-1">{organizer.phone}</td>
                <td className="py-2 px-4 flex-1">{organizer.email}</td>
                <td className="py-2 px-4 flex-1">{organizer.role}</td>
                <td className="py-2 px-4 flex-1 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(organizer._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(organizer._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {organizers.length === 0 && (
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
              {formData._id ? "Edit Organizer" : "Add Organizer"}
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
              {/* Class */}
              <div className="mb-4">
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Member Role: 
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                  required
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {roleList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
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
                  {formData._id ? "Update" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOrganizerId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this Organizer member?
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

export default SchoolOrganizers;
