import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server"; // Replace with your API base URL
import toast from "react-hot-toast";

const ProfessorStreamMapping = () => {
    const [streams, setStreams] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [mappings, setMappings] = useState([]);
    const [formData, setFormData] = useState({
        professor: "",
        stream: [],
    });
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

  // Fetch all professors and streams
  const fetchProfessorsAndStreams = async () => {
    try {
      const [streamsRes, professorRes] = await Promise.all([
        axios.get(`${API_URL}/college/stream`, { withCredentials: true }),
        axios.get(`${API_URL}/college/professor`, { withCredentials: true }),
      ]);
      setStreams(streamsRes.data.stream);
      setProfessors(professorRes.data.professor);
    } catch (error) {
      console.error("Error fetching professors and streams:", error);
    }
  };

  // Fetch all mappings
  const fetchMappings = async () => {
    try {
      const res = await axios.get(`${API_URL}/college/mapping/professor-stream`, { withCredentials: true });
      console.log(res.data.mapping);
      setMappings(res.data.mapping);
    } catch (error) {
      console.error("Error fetching mappings:", error);
    }
  };

  useEffect(() => {
    fetchProfessorsAndStreams();
    fetchMappings();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(`${API_URL}/college/mapping/professor-stream/${currentId}`, formData, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${API_URL}/college/create-mapping/professor-stream`, formData, {
          withCredentials: true,
        });
      }
      fetchMappings();
      setFormData({ 
        professor: "",
        stream: [],
      });
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Error saving mapping:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {    
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      try {
        await axios.delete(`${API_URL}/college/mapping/professor-stream/${id}`, { withCredentials: true });
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
      professor: mapping.professor._id,
      stream: mapping.stream.map((sub) => ({
        _id: sub._id,
        name: sub.name,
        specialisation: sub.specialisation,
        year: sub.year ? sub.year._id : "",
      })),
    });
    setEditMode(true);
    setCurrentId(mapping.professor._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Professor - Stream Mapping</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label htmlFor="professor" className="block text-gray-700 text-sm font-bold mb-2">
                Professor
              </label>
              <select
                id="professor"
                value={formData.professor}
                onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                className="bg-offwhite-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Professor</option>
                {professors.map((prof) => (
                  <option key={prof._id} value={prof._id}>
                    {prof.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
          <div className="w-full">
            <label
                htmlFor="stream"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                Streams
            </label>
            <select
                id="stream"
                multiple
                value={formData.stream.map((stream) => stream._id)}
                onChange={(e) => {
                    const selectedStreams = Array.from(e.target.selectedOptions).map(
                        (opt) => {
                            const stream = streams.find((s) => s._id === opt.value);
                            return stream
                                ? { _id: stream._id }
                                : null;
                        }
                    ).filter(Boolean);

                    setFormData({
                        ...formData,
                        stream: selectedStreams,
                    });
                }}
                className="bg-offwhite-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            >
                {streams.map((stream) => (
                    <option key={stream._id} value={stream._id}>
                        {`${stream.name} (${stream.specialisation}) - ${stream.year.year}`}
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
                    setFormData({     
                        professor: "",
                        stream: [], 
                    });
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
                Professor
              </th>
              <th className="px-5 py-3 bg-offwhite-dark border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Streams
              </th>
              <th className="px-5 py-3 bg-offwhite-dark border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((mapping) => {
                const { professor, stream } = mapping;
                
                return (
                    <tr key={mapping._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-offwhite-light text-sm text-center">
                            {professor.name}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-offwhite-light text-sm text-center">
                            {
                                stream.map((stream) => (
                                    <div key={stream._id}>
                                        {`${stream.name} (${stream.specialisation}) - ${stream.year.year}`}
                                    </div>
                                ))
                            }
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-offwhite-light text-sm text-center">
                            <button
                                onClick={() => handleEdit(mapping)}
                                className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(mapping.professor._id)}
                                className="text-red-500 hover:text-red-700 font-bold py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorStreamMapping;
