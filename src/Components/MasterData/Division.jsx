import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Api/server";

const Division = () => {

  const [divisions, setDivisions] = useState([]);
  const [formData, setFormData] = useState({ division: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all divisions
  const fetchDivisions = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/division`, {
        withCredentials: true,
      });
      // console.log(response.data.division);
      
      setDivisions(response.data.division);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/division/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/college/create-division`, formData, {
          withCredentials: true,
        });
      }
      setFormData({ division: "" });
      setEditMode(false);
      setCurrentId(null);
      fetchDivisions();
    } catch (error) {
      console.error("Error saving division:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this division?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/division/${id}`, {
        withCredentials: true,
      });
      fetchDivisions();
      } catch (error) {
        console.error("Error deleting division:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (division) => {
    setFormData({ division: division.division });
    setEditMode(true);
    setCurrentId(division._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Division Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <label
            htmlFor="division"
            className="block text-gray-700 text-sm font-bold mb-2"
            >
            Division
          </label>
        </div>
        <div className="mb-4 w-full flex items-center justify-between">
        <div className="w-1/2">
          <input
            type="text"
            id="division"
            value={formData.division}
            onChange={(e) => setFormData({ division: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter division (e.g., A, B, etc)"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update Division" : "Add Division"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({ division: "" });
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

      {/* Division List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Division
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {divisions.map((division) => (
              <tr key={division?._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {division?.division}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(division)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(division._id)}
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

export default Division