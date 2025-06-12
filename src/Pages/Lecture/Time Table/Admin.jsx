import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { userDataContext } from '../../../Context/UserContext';
import { API_URL } from '../../../Api/server';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user, setUser, setRole } = useContext(userDataContext);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    return moment().format('YYYY-MM-DD');
  });
  const navigate = useNavigate();

  // Format for API as DD/MM/YYYY
  const formattedDate = moment(selectedDate, 'YYYY-MM-DD').format('DD/MM/YYYY');

  useEffect(() => {
    fetchTimetable(formattedDate);
  }, [selectedDate]);

  const fetchTimetable = async (date) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/college/schedule/week`, {
        params: { date: date, stream: user?.stream?._id },
        withCredentials: true,
      });
      setTimetable(response.data.timetable);
    } catch (err) {
      if (err.response?.status === 401) {
        handleInvalidToken();
      } else {
        setError(
          err.response?.data?.message ||
          'Unable to fetch timetable. Please try again later.'
        );
        setTimetable([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInvalidToken = () => {
    toast.error('Session expired. Please log in again.');
    localStorage.removeItem('token');
    setUser(null);
    setRole(null);
    navigate('/');
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const prepareData = () => {
    const timeSlots = [];
    for (let i = 7; i <= 18; i++) {
      const time = moment({ hour: i }).format('hh:00 A');
      timeSlots.push({
        time,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null
      });
    }

    if (!Array.isArray(timetable)) {
      console.error("Timetable is not an array:", timetable);
      return timeSlots;
    }

    timetable.forEach((daySchedule) => {
      const dayIndex = daysOfWeek.indexOf(daySchedule.dayOfWeek);
      if (daySchedule.holiday) {
        timeSlots.forEach(slot => {
          slot[daysOfWeek[dayIndex].toLowerCase()] = {
            text: daySchedule.holiday,
            isHoliday: true
          };
        });
        return;
      }

      daySchedule.shifts.forEach((shift) => {
        shift.timeSlot.forEach((slot) => {
          if (!slot.startTime || !daySchedule.dayOfWeek || slot.day !== daySchedule.dayOfWeek) {
            return;
          }

          const timeSlotFormatted = moment(slot.startTime, 'hh:mm A').format('hh:00 A');
          const dayColumn = daysOfWeek[dayIndex];

          if (dayColumn) {
            const row = timeSlots.find(item => item.time === timeSlotFormatted);
            if (row) {
              row[dayColumn.toLowerCase()] = renderLecture(slot.lecture) || 'N/A';
            }
          }
        });
      });
    });

    return timeSlots;
  };

  const renderLecture = (lecture) => {
    return (
      <div>
        <b>
          <h3>{lecture?.subject?.name}</h3>
        </b>
        <h4>{lecture?.professor?.name}</h4>
        <h4>{lecture?.room?.room_no}</h4>
      </div>
    );
  }

  if (!user?.stream) {
    console.log("No stream associated with user:", user);

    // Replacing Antd Alert with a custom styled div
    return (
      <div className='p-5'>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          No stream associated with your account. Please contact admin.
        </div>
      </div>
    );
  }

  return (
    <div className='p-5'>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-2xl'>Weekly Timetable</h2>
        <div className='flex items-center gap-3'>
          <h3 className='text-lg font-medium'>Date :</h3>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            max={moment().add(1, 'year').format('YYYY-MM-DD')}
            min={moment().subtract(10, 'years').format('YYYY-MM-DD')}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span>Loading timetable...</span>
        </div>
      ) : error ? (
        <div className="my-4 p-4 bg-red-100 text-red-700 rounded border border-red-400">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="border px-2 py-1 bg-gray-100">Time</th>
                {daysOfWeek.map(day => (
                  <th key={day} className="border px-2 py-1 bg-gray-100">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prepareData().map((row, rowIndex, arr) => (
                <tr key={row.time}>
                  <td className="border px-2 py-1 font-semibold">{row.time}</td>
                  {daysOfWeek.map((day, dayIdx) => {
                    // Check if this day is a holiday for the whole column
                    const isHolidayColumn =
                      arr.every(r => r[day.toLowerCase()]?.isHoliday) &&
                      rowIndex === 0; // Only render once at the top row

                    if (isHolidayColumn) {
                      const holidayText = arr[0][day.toLowerCase()]?.text || "Holiday";
                      return (
                        <td
                          key={day}
                          rowSpan={arr.length}
                          className="border px-2 py-1 bg-red-100 text-red-700 font-bold text-center align-middle rounded"
                          style={{ verticalAlign: "middle" }}
                        >
                          {holidayText}
                        </td>
                      );
                    }

                    // If this column is a holiday but not the first row, skip rendering (merged by rowSpan)
                    if (
                      arr.every(r => r[day.toLowerCase()]?.isHoliday) &&
                      rowIndex > 0
                    ) {
                      return null;
                    }

                    const cell = row[day.toLowerCase()];
                    return (
                      <td key={day} className="border px-2 py-1 align-top">
                        {cell ? cell : 'N/A'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
