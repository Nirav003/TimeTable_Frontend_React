import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Api/server";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const TimetableSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [streams, setStreams] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({
    jsDate: "",
    date: "",
    stream: "",
    shifts: [],
    holiday: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all schedules
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/schedule`, {
        withCredentials: true,
      });
      console.log(response.data.timetable);
      setSchedules(response.data.timetable);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  // Fetch streams and shifts
  const fetchStreamsAndShifts = async () => {
    try {
      const [streamsResponse, shiftsResponse] = await Promise.all([
        axios.get(`${API_URL}/college/stream`, { withCredentials: true }),
        axios.get(`${API_URL}/college/shift`, { withCredentials: true })
      ]);
      setStreams(streamsResponse.data.stream);
      setShifts(shiftsResponse.data.shift);
    } catch (error) {
      console.error("Error fetching streams and shifts:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchStreamsAndShifts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/schedule/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/college/schedule/day`, 
          formData, 
          { withCredentials: true }
        );
      }
      setFormData({
        jsDate: "",
        date: "",
        stream: "",
        shifts: [],
        holiday: ""
      });
      setEditMode(false);
      setCurrentId(null);
      fetchSchedules();
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this schedule?");
    if (confirm) {
      try {
        await axios.delete(`${API_URL}/calendar/${id}`, {
          withCredentials: true,
        });
        fetchSchedules();
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (schedule) => {
    setFormData({
      jsDate: new Date(schedule.jsDate),
      date: schedule.date,
      stream: schedule.stream,
      shifts: schedule.shifts,
      holiday: schedule.holiday
    });
    setEditMode(true);
    setCurrentId(schedule._id);
  };

  // Handle date change
  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString('en-GB') : "";
    setFormData({ 
      ...formData, 
      jsDate: date, 
      date: formattedDate
    });
  };

  // Handle shifts change
  const handleShiftsChange = (e, index) => {
    const newShifts = [...formData.shifts];
    newShifts[index] = e.target.value;
    setFormData({ ...formData, shifts: newShifts });
  };

  // Add new shift
  const addShift = () => {
    setFormData({ ...formData, shifts: [...formData.shifts, ""] });
  };

  // Remove shift
  const removeShift = (index) => {
    const newShifts = formData.shifts.filter((_, i) => i !== index);
    setFormData({ ...formData, shifts: newShifts });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Timetable Schedule Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-3">
            <div className="w-full">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <DatePicker
                id="date"
                value={formData.jsDate}
                onChange={handleDateChange}
                className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="stream"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Stream
              </label>
              <select
                id="stream"
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Stream</option>
                {streams.map((stream) => (
                  <option key={stream._id} value={stream._id}>
                    {stream.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="holiday"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Holiday
              </label>
              <input
                type="text"
                id="holiday"
                value={formData.holiday}
                onChange={(e) => setFormData({ ...formData, holiday: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-4">
            <div className="w-full">
              <label
                htmlFor="shifts"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Shifts
              </label>
              {formData.shifts.map((shift, index) => (
                <div key={index} className="flex items-center mb-2">
                  <select
                    value={shift}
                    onChange={(e) => handleShiftsChange(e, index)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Shift</option>
                    {shifts.map((shiftOption) => (
                      <option key={shiftOption._id} value={shiftOption._id}>
                        {shiftOption.shiftNo}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeShift(index)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addShift}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Shift
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editMode ? "Update Schedule" : "Add Schedule"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({
                    jsDate: "",
                    date: "",
                    stream: "",
                    shifts: [],
                    holiday: ""
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

      {/* Schedule List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Date
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Stream
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Holiday
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule?._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {schedule?.date}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {`${schedule?.stream?.name} - ${schedule?.stream?.specialisation} (${schedule?.stream?.year?.year})`}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {schedule?.holiday}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(schedule)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule._id)}
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

export default TimetableSchedule;