import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Api/server";
import moment from "moment";

const TimeSlot = () => {

  const [timeSlots, setTimeSlots] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({ 
    shiftId: "",
    startTime: "",
    endTime: "",
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

  // Fetch all shifts
  const fetchShifts = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/shift`, {
        withCredentials: true,
      });
      
      // console.log(response.data.shift);
      
      setShifts(response.data.shift);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  useEffect(() => {
    fetchShifts();
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
        shiftId: "",
        startTime: "",
        endTime: "",
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
    console.log("Editing timeslot:", timeslot);
    
    setFormData({ 
      shiftId: timeslot.shiftId,
      startTime: timeslot.startTime,
      endTime: timeslot.endTime,  
    });
    setEditMode(true);
    setCurrentId(timeslot._id);
  };

  const handleShiftChange = (e) => {
    const selectedShiftId = e.target.value;
    const selectedShift = shifts.find(shift => shift._id === selectedShiftId);

    if (selectedShift) {
      setFormData(prevState => ({
        ...prevState,
        shiftId: selectedShiftId,
        shiftNo: selectedShift.shiftNo || "",
        day: selectedShift.day || "",
        date: selectedShift.date
          ? moment(selectedShift.date).format("DD-MM-YYYY")
          : "",
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        shiftId: "",
        shiftNo: "",
        day: "",
        date: "",
      }));
    }
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
                htmlFor="shift"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Shift
              </label>
              <select
                id="shift"
                value={formData.shiftId || ""}
                onChange={handleShiftChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Shift</option>
                {shifts.map((shift) => (
                  <option key={shift._id} value={shift._id}>
                    {`Shift ${shift.shiftNo} - ${shift.day} (${moment(shift.date).format("DD-MM-YYYY")})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="shiftNo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Shift No
              </label>
              <input
                type="text"
                id="shiftNo"
                value={formData.shiftNo || ""}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="day"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Day of Week
              </label>
              <input
                type="text"
                id="day"
                value={formData.day || ""}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <input
                type="text"
                id="date"
                value={formData.date || ""}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
              />
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editMode ? "Update Time Slot" : "Save Time Slot"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    shiftId : "",
                    startTime : "",
                    endTime: "",
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
        <table className="min-w-full leading-normal">          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Sr. No.
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Date
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Shift No
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Day of Week
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
            {timeSlots.map((ts, i) => (
              <tr key={ts._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {i+1}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.Shift?.date ? moment(ts.Shift.date).format("DD-MM-YYYY") : "N/A"}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.Shift?.shiftNo || "N/A"}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.Shift?.day || "N/A"}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.startTime || "N/A"}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {ts?.endTime || "N/A"}
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