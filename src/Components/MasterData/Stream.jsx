import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server"; 

const Stream = () => {

  const [streams, setStreams] = useState([]);
  const [years, setYears] = useState([]);
  const [formData, setFormData] = useState({ 
    name : "",
    specialisation : "",
    yearId: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all streams
  const fetchStreams = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/stream`, {
        withCredentials: true,
      });
      // console.log(response.data.stream);
      
      setStreams(response.data.stream);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  // Fetch all years
  const fetchYears = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/year`, {
        withCredentials: true,
      });
      // console.log(response.data.years);
      
      setYears(response.data.years);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  useEffect(() => {
    fetchStreams();
    fetchYears();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/stream/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/college/create-stream`, formData, {
          withCredentials: true,
        });
      }
      setFormData({ 
        name : "",
        specialisation : "",
        yearId: ""
      });
      setEditMode(false);
      setCurrentId(null);
      fetchStreams();
    } catch (error) {
      console.error("Error saving stream:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this stream?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/stream/${id}`, {
        withCredentials: true,
      });
      fetchStreams();
      } catch (error) {
        console.error("Error deleting stream:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (stream) => {
    setFormData({ 
      name: stream.name,
      specialisation: stream.specialisation,
      yearId: stream.year._id,
    });
    setEditMode(true);
    setCurrentId(stream._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Stream Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-3">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Stream Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter stream name (e.g., BSc, BCOM, etc)"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="specialisation"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Specialisation
              </label>
              <input
                type="text"
                id="specialisation"
                value={formData.specialisation}
                onChange={(e) => setFormData({ ...formData, specialisation: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter specialisation (e.g., IT, CS, etc)"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="year"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Year
              </label>
              <select
                type="text"
                id="year"
                value={formData.yearId}
                onChange={(e) => setFormData({ ...formData, yearId: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter stream name (e.g., BSc, BCOM, etc)"
                required
              >
                <option value="">Select Year</option>
                {
                  years.map((year, index) => (
                    <option key={index} value={year._id}>{year.year}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editMode ? "Update Stream" : "Add Stream"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    name : "",
                    specialisation : "",
                    yearId: ""
                  });
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

      {/* Stream List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Stream Name
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Specialisation
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Year
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {streams.map((stream) => (
              <tr key={stream._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {stream.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {stream.specialisation}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {stream.year.year}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(stream)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stream._id)}
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

export default Stream