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

const TimeSlot = () => {

  const [timeSlots, setTimeSlots] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [formData, setFormData] = useState({ 
    day : "",
    startTime : "",
    endTime: "",
    lecture : "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all TimeSlot
  const fetchTimeSlot = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/timeslot`, {
        withCredentials: true,
      })
      
      // console.log(response.data.slot);
      setTimeSlots(response.data.slot);
      
    } catch (error) {
      console.error("Error fetching timeslot:", error);
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
    fetchTimeSlot();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/timeslot/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {        
        await axios.post(`${API_URL}/college/create-timeslot`, 
          formData, 
          { withCredentials: true }
        );
      }
      setFormData({ 
        day : "",
        startTime : "",
        endTime: "",
        lecture : "",
      });
      setEditMode(false);
      setCurrentId(null);
      fetchTimeSlot();
    } catch (error) {
      console.error("Error saving timeslot:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this timeslot?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/timeslot/${id}`, {
        withCredentials: true,
      });
      fetchTimeSlot();
      } catch (error) {
        console.error("Error deleting timeslot:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (timeslot) => {
    setFormData({ 
      day : timeslot.day,
      startTime : timeslot.startTime,
      endTime: timeslot.endTime,
      lecture : timeslot.lecture._id,
    });
    setEditMode(true);
    setCurrentId(timeslot._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Timeslot Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="startTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Start Time
              </label>
              <select
                id="startTime"
                value={formData.startTime || ""}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Start Time</option>
                {generateTimeOptions().map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="endTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                End Time
              </label>
              <select
                id="endTime"
                value={formData.endTime || ""}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select End Time</option>
                {generateTimeOptions().map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
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
                htmlFor="lecture"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Lecture
              </label>
              <select
                type="text"
                id="lecture"
                value={formData.lecture}
                onChange={(e) => setFormData({ ...formData, lecture: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Lecture</option>
                {
                  lectures.map((lec, index) => (
                    <option key={index} value={lec._id}>
                      {`${lec.lectureType} - ${lec.subject.name} - ${lec.professor.name} - ${lec.room.room_no}`}
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
              {editMode ? "Update Time Slot" : "Add Time Slot"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    day : "",
                    startTime : "",
                    endTime: "",
                    lecture : "",
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
                Day
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Start Time
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                End Time
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((ts) => (  
              <tr key={ts._id}>
                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {`${ts?.lecture?.lectureType} - ${ts?.lecture?.subject?.name} - ${ts?.lecture?.professor?.name} - ${ts.lecture.room.room_no}`}
                </td> */}
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {`${ts?.lecture?.lectureType} - ${ts?.lecture?.subject?.name} - ${ts?.lecture?.professor?.name} - ${ts.lecture.room.room_no}`}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.day}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.startTime}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.endTime}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(ts)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ts._id)}
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

export default TimeSlot;