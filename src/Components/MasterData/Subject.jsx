import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server";

const Subject = () => {

  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/subject`, {
        withCredentials: true,
      });
      // console.log(response.data.subject);
      
      setSubjects(response.data.subject);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/subject/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/college/create-subject`, formData, {
          withCredentials: true,
        });
      }
      setFormData({ name: "" });
      setEditMode(false);
      setCurrentId(null);
      fetchSubjects();
    } catch (error) {
      console.error("Error saving subject:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this subject?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/subject/${id}`, {
        withCredentials: true,
      });
      fetchSubjects();
      } catch (error) {
        console.error("Error deleting subject:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (subject) => {
    setFormData({ name: subject.name });
    setEditMode(true);
    setCurrentId(subject._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Subject Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <label
            htmlFor="subject"
            className="block text-gray-700 text-sm font-bold mb-2"
            >
            Subject Name
          </label>
        </div>
        <div className="mb-4 w-full flex items-center justify-between">
        <div className="w-1/2">
          <input
            type="text"
            id="subject"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter subject name (e.g., SQA, LINUX, etc)"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update Subject" : "Add Subject"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({ name: "" });
                setCurrentId(null);
              }}
              className="ml-4 bg-red-500 hover:bg-red-700 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
        </div>
      </form>

      {/* Subject List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Subject Name
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {subject.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="text-red-500 hover:text-red-700 font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subject;