import React, { useState } from 'react'
import Room from '../../Components/MasterData/Room';
import Stream from '../../Components/MasterData/Stream';
import Professor from '../../Components/MasterData/Professor';
import Subject from '../../Components/MasterData/Subject';
import Division from '../../Components/MasterData/Division';
import TimeSlot from '../../Components/MasterData/TimeSlot';
import Shift from '../../Components/MasterData/Shift';
import Year from '../../Components/MasterData/Year';
import Lecture from '../../Components/MasterData/Lecture';
import SelectFile from '../../Components/Select File/SelectFile';

const MasterData = () => {
    
    const [currentSelectedTab, setCurrentSelectedTab] = useState('');

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

export default MasterData