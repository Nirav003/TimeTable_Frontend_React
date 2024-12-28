import React from 'react'
import { useNavigate } from 'react-router-dom'

const MasterData = () => {

    const navigate = useNavigate();

    const data = [
        {name: "classroom", route: "classroom"}, 
        {name: "stream", route: "stream"}, 
        {name: "year", route: "year"}, 
        {name: "professor", route: "professor"}, 
        {name: "subject", route: "subject"}, 
        {name: "division", route: "division"}, 
        {name: "timeslot", route: "timeslot"}, 
        {name: "shift", route: "shift"}, 
    ]

  return (
    <div className="max-w-screen h-full mx-auto px-10">
        <h2 className="text-2xl text-center font-semibold text-primary-dark mb-16 underline underline-offset-8">
          Master Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Job Cards */}
          {data.map((list, i) => (
            <div key={i} className="bg-offwhite-light w-full text-primary-dark text-center rounded-lg shadow-lg p-6 cursor-pointer" onClick={() => navigate(list.route)}>
              <h2 className="text-xl font-semibold">{list.name}</h2>
            </div>
          ))}
        </div>
      </div>
  )
}

export default MasterData