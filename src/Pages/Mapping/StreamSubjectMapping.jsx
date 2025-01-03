import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server"; // Replace with your API base URL
import toast from "react-hot-toast";

const StreamSubjectMapping = () => {
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [formData, setFormData] = useState({
    stream: "",
    subjects: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all streams and subjects
  const fetchStreamsAndSubjects = async () => {
    try {
      const [streamsRes, subjectsRes] = await Promise.all([
        axios.get(`${API_URL}/college/stream`, { withCredentials: true }),
        axios.get(`${API_URL}/college/subject`, { withCredentials: true }),
      ]);
      setStreams(streamsRes.data.stream);
      setSubjects(subjectsRes.data.subject);
    } catch (error) {
      console.error("Error fetching streams or subjects:", error);
    }
  };

  // Fetch all mappings
  const fetchMappings = async () => {
    try {
      const res = await axios.get(`${API_URL}/college/mapping/stream-subject`, { withCredentials: true });
      setMappings(res.data.mapping);
    } catch (error) {
      console.error("Error fetching mappings:", error);
    }
  };

  useEffect(() => {
    fetchStreamsAndSubjects();
    fetchMappings();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(`${API_URL}/college/mapping/stream-subject/${currentId}`, formData, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${API_URL}/college/create-mapping/stream-subject`, formData, {
          withCredentials: true,
        });
      }
      fetchMappings();
      setFormData({ 
        stream: "", 
        subjects: [] 
      });
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Error saving mapping:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    console.log(id);
    
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      try {
        await axios.delete(`${API_URL}/college/mapping/stream-subject/${id}`, { withCredentials: true });
        fetchMappings();
      } catch (error) {
        console.error("Error deleting mapping:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (mapping) => {
    setFormData({
      stream: mapping.stream._id,
      subjects: mapping.subjects.map((sub) => sub._id),
    });
    setEditMode(true);
    setCurrentId(mapping.stream._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Stream-Subject Mapping</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label htmlFor="stream" className="block text-gray-700 text-sm font-bold mb-2">
                Stream
              </label>
              <select
                id="stream"
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="bg-offwhite-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Stream</option>
                {streams.map((stream) => (
                  <option key={stream._id} value={stream._id}>
                    {`${stream.year.year} - ${stream.name} (${stream.specialisation})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label htmlFor="subjects" className="block text-gray-700 text-sm font-bold mb-2">
                Subjects
              </label>
              <select
                id="subjects"
                multiple
                value={formData.subjects}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subjects: Array.from(e.target.selectedOptions, (opt) => opt.value),
                  })
                }
                className="bg-offwhite-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editMode ? "Update Mapping" : "Add Mapping"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ stream: "", subjects: [] });
                  setCurrentId(null);
                }}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Mappings List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-offwhite-dark border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Stream
              </th>
              <th className="px-5 py-3 bg-offwhite-dark border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Subjects
              </th>
              <th className="px-5 py-3 bg-offwhite-dark border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((mapping) => (
              <tr key={mapping._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-offwhite-light text-sm text-center">
                  {`${mapping.stream.year.year} - ${mapping.stream.name} (${mapping.stream.specialisation})`}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-offwhite-light text-sm text-center">
                  {mapping.subjects.map((sub) => sub.name).join(", ")}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-offwhite-light text-sm text-center">
                  <button
                    onClick={() => handleEdit(mapping)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mapping.stream._id)}
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
};

export default StreamSubjectMapping;
