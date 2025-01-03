import React, { useState, useEffect } from "react";
import axios from "axios";

const Student = ({ stream, division }) => {
    
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`/api/calendar`, {
          params: { stream, division, date: new Date().toISOString() },
        });
        setTimetable(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [stream, division]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timetable</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">Shift</th>
            <th className="px-6 py-3 text-left">Time Slot</th>
            <th className="px-6 py-3 text-left">Subject</th>
            <th className="px-6 py-3 text-left">Professor</th>
            <th className="px-6 py-3 text-left">Room</th>
          </tr>
        </thead>
        <tbody>
          {timetable.shifts.map((shift) =>
            shift.lectures.map((lecture, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-2">{`Shift ${shift.shiftNo}`}</td>
                <td className="px-6 py-2">{`${shift.timeSlot.startTime} - ${shift.timeSlot.endTime}`}</td>
                <td className="px-6 py-2">{lecture.subject.name}</td>
                <td className="px-6 py-2">{lecture.professor.name}</td>
                <td className="px-6 py-2">{lecture.room.room_no}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
