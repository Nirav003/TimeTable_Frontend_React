import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, DatePicker, Spin, Alert } from 'antd';
import { userDataContext } from '../../../Context/UserContext';
import { API_URL } from '../../../Api/server';

const Student = () => {
  const { user } = useContext(userDataContext);
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
      const response = await axios.get(`${API_URL}/college/schedule/week`, {
        params: { date: formattedDate },
        withCredentials: true,
      });
      
      setTimetable(response.data.timetable);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch timetable');
      setTimetable([]);
    } finally {
      setLoading(false);
    }
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
          slot[daysOfWeek[dayIndex].toLowerCase()] = daySchedule.holiday;
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
          columns={[
            { title: 'Time', dataIndex: 'time', key: 'time' },
            ...daysOfWeek.map(day => ({
              title: day,
              dataIndex: day.toLowerCase(),
              key: day.toLowerCase(),
              render: (lecture) => lecture || 'N/A'
            }))
          ]}
          rowKey={(record) => record.time}
          pagination={false}
        />
      )}
    </div>
  );
};

export default Student;
