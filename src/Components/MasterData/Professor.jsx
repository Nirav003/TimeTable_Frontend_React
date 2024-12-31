import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server"; 

const Professor = () => {

  const [professors, setProfessors] = useState([]);
  const [streams, setStreams] = useState([]);
  const [formData, setFormData] = useState({ 
    name : "",
    designation : "",
    emailId : "",
    phoneNumber : "",
    streamId : ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all professors
  const fetchProfessors = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/professor`, {
        withCredentials: true,
      });
      // console.log('professors >>> ', response.data.professor);
      
      setProfessors(response.data.professor);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  // Fetch all streams
  const fetchStreams = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/stream`, {
        withCredentials: true,
      });
      // console.log('streams >>> ', response.data.stream);
      
      setStreams(response.data.stream);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  

  useEffect(() => {
    fetchProfessors();
    fetchStreams();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/professor/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/college/create-professor`, formData, {
          withCredentials: true,
        });
      }
      setFormData({ 
        name : "",
        designation : "",
        emailId : "",
        phoneNumber : "",
        streamId : "",
      });
      setEditMode(false);
      setCurrentId(null);
      fetchProfessors();
    } catch (error) {
      console.error("Error saving professor:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this professor?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/professor/${id}`, {
        withCredentials: true,
      });
      fetchProfessors();
      } catch (error) {
        console.error("Error deleting professor:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (professor) => {    
    setFormData({ 
      name : professor.name,
      designation : professor.designation,
      emailId : professor.emailId,
      phoneNumber : professor.phoneNumber,
      streamId : professor.stream._id,
    });
    setEditMode(true);
    setCurrentId(professor._id);
  };  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Professor Management</h1>

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
                Professors Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter professors name"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="designation"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Professors Designation
              </label>
              <input
                type="text"
                id="designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter designation (e.g., Principal, Teacher, etc)"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-3">
            <div className="w-full">
              <label
                htmlFor="emailId"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Professors Email
              </label>
              <input
                type="text"
                id="emailId"
                value={formData.emailId}
                onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter professors email"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Professors Phone No
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter professors phone no"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-3">
            <div className="w-full">
              <label
                htmlFor="stream"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Stream
              </label>
              <select
                type="text"
                id="stream"
                value={formData.streamId}
                onChange={(e) => setFormData({ ...formData, streamId: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Stream</option>
                {
                  streams.map((stream, index) => (
                    <option key={index} value={stream._id}>
                      {`${stream.name} - ${stream.specialisation} (${stream.year.year})`}
                    </option>
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
              {editMode ? "Update Professor" : "Add Professor"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    name : "",
                    designation : "",
                    emailId : "",
                    phoneNumber : "",
                    streamId : ""
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

      {/* Professor List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Professor Name
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Designation
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Email
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Phone No
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Stream
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {professors.map((professor) => (
              <tr key={professor._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.designation}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.emailId}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.phoneNumber}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {`${professor.stream.name} - ${professor.stream.specialisation} (${professor.stream.year.year})`}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(professor)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(professor._id)}
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

export default Professor