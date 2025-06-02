import React, { useState } from 'react'
import Shift from '../../Components/MasterData/Shift';
import TimeSlot from '../../Components/MasterData/TimeSlot';
import Lecture from '../../Components/MasterData/Lecture';
import TimetableSchedule from '../../Components/MasterData/TimetableSchedule';
import SelectFile from '../../Components/Select File/SelectFile';

const ScheduleData = () => {
    
    const [currentSelectedTab, setCurrentSelectedTab] = useState('');

    const data = [ 
        {
          id: "shift",
          label: "Shift",
          Component: <Shift />
        },
        {
          id: "timeslot",
          label: "Timeslot",
          Component: <TimeSlot />
        },
        {
            id: "lecture",
            label: "Lecture",
            Component: <Lecture />
        } ,
        {
            id: "timetable-schedule",
            label: "Timetable Schedule",
            Component: <TimetableSchedule />
        } 
    ]

  return (
    <div className="flex max-w-screen mx-auto -translate-y-[6px] -translate-x-[16px]">
      <div className='w-1/5 px-5 h-full mt-12'>
        <ul>
          {data?.map((item, i) => (
            <li key={i} className={`mb-4 cursor-pointer ${currentSelectedTab === item.id ? 'underline underline-offset-2 decoration-2 decoration-primary-dark' : ''}`}>
              <button 
                className="bg-offwhite-light w-full text-test2-3 text-center rounded-lg shadow-lg p-2 cursor-pointer" 
                onClick={() => setCurrentSelectedTab(item.id)}
              >
                <h2 className="text-xl font-semibold">{item.label}</h2>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='my-8 translate-y-5 border-r-2 border-test2-2'></div>
      <div className='w-4/5 p-4'>
        <div className="p-4">
          {data.find(item => item.id === currentSelectedTab)?.Component || <SelectFile />}
        </div>
      </div>
    </div>
  )
}

export default ScheduleData