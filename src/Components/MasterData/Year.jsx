import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server";

const Year = () => {

  const [years, setYears] = useState([]);
  const [formData, setFormData] = useState({ year: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all years
  const fetchYears = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/year`, {
        withCredentials: true,
      });
      // console.log(response.data);
      
      setYears(response.data.years);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/year/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/college/create-year`, formData, {
          withCredentials: true,
        });
      }
      setFormData({ year: "" });
      setEditMode(false);
      setCurrentId(null);
      fetchYears();
    } catch (error) {
      console.error("Error saving year:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this year?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/year/${id}`, {
        withCredentials: true,
      });
      fetchYears();
      } catch (error) {
        console.error("Error deleting year:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (year) => {
    setFormData({ year: year.year });
    setEditMode(true);
    setCurrentId(year._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Year Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <label
            htmlFor="year"
            className="block text-gray-700 text-sm font-bold mb-2"
            >
            Year
          </label>
        </div>
        <div className="mb-4 w-full flex items-center justify-between">
        <div className="w-1/2">
          <input
            type="text"
            id="year"
            value={formData.year}
            onChange={(e) => setFormData({ year: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter year (e.g., First Year)"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update Year" : "Add Year"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({ year: "" });
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

      {/* Year List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Year
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map((year) => (
              <tr key={year._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {year.year}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(year)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(year._id)}
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

export default Year;