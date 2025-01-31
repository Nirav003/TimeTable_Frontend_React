import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, DatePicker, Spin, Alert } from 'antd';
import { userDataContext } from '../../../Context/UserContext';
import { API_URL } from '../../../Api/server';

const Admin = () => {
  const { user } = useContext(userDataContext);
  const [schedule, setSchedule] = useState({});
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    fetchTimetable(selectedDate);
  }, [selectedDate]);

  const fetchTimetable = async (date) => {
    setLoading(true);
    setError('');
    try {
      const formattedDate = date.format('DD/MM/YYYY');
      const { batch, year } = user;
      const response = await axios.get(`${API_URL}/college/calendar`, {
        params: { date: formattedDate, stream: batch, year },
        withCredentials: true,
      });

      // console.log("Fetched Timetable:", response.data);
      setSchedule(response.data.timetable);
      setTimetable(response.data.timetable.shifts);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch timetable');
      setTimetable([]);
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const prepareData = () => {
    const timeSlots = [];
  
    // Initialize empty time slots
    for (let i = 7; i <= 18; i++) {
      const time = moment({ hour: i }).format('hh:00 A');
      timeSlots.push({
        time,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null
      });
    }
  
    // Ensure `timetable` is an array before iterating
    if (!Array.isArray(timetable)) {
      console.error("Timetable is not an array:", timetable);
      return timeSlots; // Return empty slots if data is invalid
    }
  
    // Populate timetable with shifts
    timetable.forEach((shift) => {
      
      if (!shift.timeSlot || !Array.isArray(shift.timeSlot)) {
        console.warn("Skipping shift with invalid timeSlot:", shift);
        return; // Skip invalid entries
      }

      
      shift.timeSlot.forEach((slot) => {

        if (!slot.startTime || !schedule.dayOfWeek) {
          console.warn("Skipping slot with missing data:", schedule);
          return;
        }
  
        const timeSlotFormatted = moment(slot.startTime, 'HH:mm').format('hh:00 A');
        const dayColumn = daysOfWeek.find(day => day.toLowerCase() === schedule?.dayOfWeek?.toLowerCase());
  
        if (dayColumn) {
          const row = timeSlots.find(item => item.time === timeSlotFormatted);
          if (row) {
            row[dayColumn.toLowerCase()] = slot.lecture || 'N/A';
          }
        }
      });
    });
  
    return timeSlots;
  };
  

  const renderLecture = (lecture) => {
    if (!lecture) return 'N/A';
    return (
      <div>
        <div><strong>{lecture.subject?.name || 'N/A'}</strong></div>
        <div>{lecture.professor?.name || 'N/A'}</div>
        <div>{lecture.room?.room_no || 'N/A'}</div>
      </div>
    );
  };

  const columns = [
    { title: 'Time', dataIndex: 'time', key: 'time' },
    ...daysOfWeek.map(day => ({
      title: day,
      dataIndex: day.toLowerCase(),
      key: day.toLowerCase(),
      render: renderLecture
    }))
  ];

  return (
    <div className='p-5'>
      <div className='mb-5 flex items-center justify-between'>
        <h2>Weekly Timetable</h2>
        <div className='flex items-center gap-3'>
          <h3>Date:</h3>
          <DatePicker
            onChange={(date) => setSelectedDate(date)}
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
          />
        </div>
      </div>

      {loading ? (
        <Spin tip="Loading timetable..." />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        <Table
          dataSource={prepareData()}
          columns={columns}
          rowKey={(record) => record.time}
          pagination={false}
        />
      )}
    </div>
  );
};

export default Admin;
