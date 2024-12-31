import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server"; 

const Lecture = () => {

  const [lectures, setLectures] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [formData, setFormData] = useState({ 
    lectureType : "",
    subject : "",
    room: "",
    professor : "",
    division: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all Data
  const fetchData = async () => {
    try {
      const [ subjects, rooms, professors, divisions ] = await Promise.all([
        axios.get(`${API_URL}/college/subject`, {
          withCredentials: true,
        }),
        axios.get(`${API_URL}/college/rooms`, {
          withCredentials: true,
        }),
        axios.get(`${API_URL}/college/professor`, {
          withCredentials: true,
        }),
        axios.get(`${API_URL}/college/division`, {
          withCredentials: true,
        }),
      ])
      
      setSubjects(subjects.data.subject)
      setRooms(rooms.data.room)
      setDivisions(divisions.data.division)
      setProfessors(professors.data.professor)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch all lectures
  const fetchLectures = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/lectures`, {
        withCredentials: true,
      });
      
      setLectures(response.data.lecture);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      division: formData.division === "" ? null : formData.division, 
    }

    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/lecture/${currentId}`,
          data,
          { withCredentials: true }
        );
      } else {        
        await axios.post(`${API_URL}/college/create-lecture`, 
          data, 
          { withCredentials: true }
        );
      }
      setFormData({ 
        lectureType : "",
        subject : "",
        room: "",
        professor : "",
        division: ""
      });
      setEditMode(false);
      setCurrentId(null);
      fetchLectures();
    } catch (error) {
      console.error("Error saving lecture:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this lecture?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/lecture/${id}`, {
        withCredentials: true,
      });
      fetchLectures();
      } catch (error) {
        console.error("Error deleting lecture:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (lecture) => {
    setFormData({ 
      lectureType : lecture.lectureType,
      subject : lecture.subject._id,
      room: lecture.room._id,
      professor : lecture.professor._id,
      division: lecture.division ? lecture.division._id : ""
    });
    setEditMode(true);
    setCurrentId(lecture._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Lecture Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-3">
            <div className="w-full">
              <label
                htmlFor="lectureType"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Lecture Type
              </label>
              <select
                type="text"
                id="lectureType"
                value={formData.lectureType}
                onChange={(e) => setFormData({ ...formData, lectureType: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Lecture Type</option>
                <option value="Theory">Theory</option>
                <option value="Practical">Practical</option>
                <option value="Break">Break</option>
                <option value="Guest Lecture">Guest Lecture</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="subject"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Subject
              </label>
              <select
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Subject</option>
                {
                  subjects.map((sub, index) => (
                    <option key={index} value={sub._id}>{sub.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="room"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Room
              </label>
              <select
                type="text"
                id="room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Room</option>
                {
                  rooms.map((room, index) => (
                    <option key={index} value={room._id}>{room.room_no}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="professor"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Professor
              </label>
              <select
                type="text"
                id="professor"
                value={formData.professor}
                onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Professor</option>
                {
                  professors.map((prof, index) => (
                    <option key={index} value={prof._id}>{prof.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="division"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Division
              </label>
              <select
                type="text"
                id="division"
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Division</option>
                {
                  divisions.map((div, index) => (
                    <option key={index} value={div._id}>{div.division}</option>
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
              {editMode ? "Update Lecture" : "Add Lecture"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    lectureType : "",
                    subject : "",
                    room: "",
                    professor : "",
                    division: ""
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

      {/* Lecture List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Lecture
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Subject
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Room
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Professor
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Division
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lec) => (
              <tr key={lec._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {lec.lectureType}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {lec.subject.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {lec.room.room_no}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {lec.professor.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {lec.division ? lec.division.division : "No Division"}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(lec)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lec._id)}
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

export default Lecture;