import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Api/server"; 

const Shift = () => {

  const [shifts, setShifts] = useState([]);
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({ 
    shiftNo : "",
    timeSlot : ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all Data
  const fetchSlots = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/timeslot`, {
        withCredentials: true,
      })

      console.log(response.data.slot);
      
      setSlots(response.data.slot)
    } catch (error) {
      console.error("Error fetching timeslot:", error);
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
    fetchSlots();
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
        timeSlot : ""
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
      timeSlot : shift.timeSlot._id
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
                htmlFor="timeSlot"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Time Slot
              </label>
              <select
                type="text"
                id="timeSlot"
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Time Slot</option>
                {
                  slots.map((slot, index) => (
                    <option key={index} value={slot._id}>
                      {`${slot.day} | ${slot.startTime} - ${slot.endTime} | ${slot.lecture.lectureType} | ${slot.lecture.subject.name}`}
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
              {editMode ? "Update Shift" : "Add Shift"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    shiftNo : "",
                    timeSlot : ""
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
                Day
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Shift
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Time Slot
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Lecture
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
                  {shift.timeSlot.day}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {shift.shiftNo}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {`${shift.timeSlot.startTime} - ${shift.timeSlot.endTime}`}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {`${shift.timeSlot.lecture.lectureType} - ${shift.timeSlot.lecture.subject.name}`}
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