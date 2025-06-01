import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Api/server"; 

const generateTimeOptions = () => {
  const times = [];
  const startHour = 7;
  const endHour = 18; 

  for (let hour = startHour; hour <= endHour; hour++) {
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    times.push(`${displayHour}:00 ${period}`); // , `${displayHour}:30 ${period}`
  }

  return times;
};

const Shift = () => {

  const [shifts, setShifts] = useState([]);
  const [streams, setStreams] = useState([]);
  const [formData, setFormData] = useState({ 
    shiftNo : "",
    startTime : "",
    endTime : "",
    day: "",
    date: "",
    stream : ""
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

  // Fetch all shifts
  const fetchShifts = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/shift`, {
        withCredentials: true,
      });
      
      console.log(response.data.shift);
      
      setShifts(response.data.shift);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  useEffect(() => {
    fetchStreams();
    fetchShifts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/shift/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {        
        await axios.post(`${API_URL}/college/create-shift`, 
          formData, 
          { withCredentials: true }
        );
      }
      setFormData({ 
        shiftNo : "",
        startTime : "",
        endTime : "",
        day: "",
        date: "",
        stream : ""
      }); 
      setEditMode(false);
      setCurrentId(null);
      fetchShifts();
    } catch (error) {
      console.error("Error saving shift:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this shift?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/shift/${id}`, {
        withCredentials: true,
      });
      fetchShifts();
      } catch (error) {
        console.error("Error deleting shift:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (shift) => {
    setFormData({ 
      shiftNo : shift.shiftNo,
      startTime : shift.startTime,
      endTime : shift.endTime,
      day: shift.day,
      date: shift.date,
      stream : shift.stream ? shift.stream._id : "",
    });
    setEditMode(true);
    setCurrentId(shift._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Shift Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="shiftNo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Shift
              </label>
              <select
                type="text"
                id="shiftNo"
                value={formData.shiftNo}
                onChange={(e) => setFormData({ ...formData, shiftNo: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Shift</option>
                <option value="1">1 (Morning)</option>
                <option value="2">2 (Afternoon)</option>
                <option value="3">3 (Evening)</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <div>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
                {/* <DatePicker selectedDate={formData.date} setSelectedDate={formData.date} /> */}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="startTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                value={formData.startTime || ""}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="endTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                value={formData.endTime || ""}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="day"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Day
              </label>
              <select
                type="text"
                id="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
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
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
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
              {editMode ? "Update Shift" : "Create Shift"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    shiftNo : "",
                    startTime : "",
                    endTime : "",
                    day: "",
                    date: "",
                    stream : ""
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

      {/* Shift List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Date
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Day
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Shift
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Start Time
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                End Time
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
            {shifts.map((shift) => (
              <tr key={shift._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {shift?.date}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {shift?.day}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {shift?.shiftNo}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {shift?.startTime}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {shift?.endTime}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {shift?.stream ? `${shift.stream.name} - ${shift.stream.specialisation} (${shift.stream.year.year})` : "N/A"}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(shift)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(shift._id)}
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

export default Shift;