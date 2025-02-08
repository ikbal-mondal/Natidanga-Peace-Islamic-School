import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const SchoolOrganizers = () => {
  const [organizers, setOrganizers] = useState([]); // State to store teacher details
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [deleteOrganizerId, setDeleteOrganizerId] = useState(null); // Track teacher to delete
  return (
    <div>
        <p>School Organizers</p>
    </div>
  );
};

export default SchoolOrganizers;
