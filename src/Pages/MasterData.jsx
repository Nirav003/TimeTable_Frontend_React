import React, { useState } from 'react'
import Room from '../Components/MasterData/Room';
import Stream from '../Components/MasterData/Stream';
import Professor from '../Components/MasterData/Professor';
import Subject from '../Components/MasterData/Subject';
import Division from '../Components/MasterData/Division';
import TimeSlot from '../Components/MasterData/TimeSlot';
import Shift from '../Components/MasterData/Shift';
import Year from '../Components/MasterData/Year';
import Lecture from '../Components/MasterData/Lecture';

const initialRoom = {
  roomType: '',
  floor: '',
  room_no: '',
  dimentions: '',
}

const initialStream = {
  name: '',
  specialisation: '',
}

const initialProfessor = {
  name: '',
  designation: '',
  emailId: '',
  phoneNumber: '',
}

const initialSubject = {
  name: ''
}

const initialDivision = {
  division: '',
}

const initialTimeSlot = {
  start_time: '',
  end_time: '',
  day: '',
  slotType: '',
  lecture: ''
}

const initialShift = {
    shiftNo: '',
    timeSlot: ''
} 

const initialYear = {
    year: ''
}

const MasterData = () => {
    
    const [currentSelectedTab, setCurrentSelectedTab] = useState('room');

    const data = [
        {
          id: "room",
          label: "Room",
          Component: <Room />
        }, 
        {
          id: "stream",
          label: "Stream",
          Component: <Stream />
        }, 
        {
          id: "year",
          label: "Year",
          Component: <Year />
        }, 
        {
          id: "professor",
          label: "Professor",
          Component: <Professor />
        }, 
        {
          id: "subject",
          label: "Subject",
          Component: <Subject />
        }, 
        {
          id: "devision",
          label: "Division",
          Component: <Division />
        }, 
        {
          id: "timeslot",
          label: "Timeslot",
          Component: <TimeSlot />
        },
        {
          id: "shift",
          label: "Shift",
          Component: <Shift />
        },
        {
            id: "lecture",
            label: "Lecture",
            Component: <Lecture />
        } 
    ]

  return (
    <div className="flex max-w-screen h-full mx-auto -translate-y-[6px] -translate-x-[16px]">
      <div className='w-1/5 px-5 h-full'>
        <h2 className="text-xl text-center font-semibold text-primary-dark mt-10 mb-8 underline underline-offset-8">
          Master Data
        </h2>
        <ul>
          {data.map((item, i) => (
            <li key={i} className={`mb-2 cursor-pointer text-primary-dark ${currentSelectedTab === item.id ? 'underline underline-offset-2 decoration-2 decoration-primary-dark' : ''}`}>
              <button 
                className="bg-offwhite-light w-full text-primary-dark text-center rounded-lg shadow-lg p-2 cursor-pointer" 
                onClick={() => setCurrentSelectedTab(item.id)}
              >
                <h2 className="text-xl font-semibold">{item.label}</h2>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='translate-y-[6px] border-r-2 border-primary-dark'></div>
      <div className='w-4/5 p-4'>
      <div className="p-4">
          {data.find(item => item.id === currentSelectedTab)?.Component || <div>Select a tab to view content</div>}
        </div>
      </div>
    </div>
  )
}

export default MasterData