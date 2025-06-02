import React, { useState } from "react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { FiCalendar } from "react-icons/fi"

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false)

  const toggleCalendar = () => setShowCalendar(!showCalendar)

  const handleDateSelect = (date) => {
    setSelectedDate(date || new Date())
    setShowCalendar(false)
  }

  const formattedDate = format(selectedDate || new Date(), "dd/MM/yyyy")

  return (
    <div className="relative inline-block w-64">
      <button
        onClick={toggleCalendar}
        className="w-full flex items-center justify-between px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-50 text-gray-800"
      >
        <span>{formattedDate}</span>
        <FiCalendar className="text-xl text-gray-500" />
      </button>

      {showCalendar && (
        <div className="absolute z-10 mt-2 right-0 bg-white rounded-lg shadow-lg p-4">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            modifiersClassNames={{
              selected: "bg-blue-500 text-white",
              today: "border border-blue-600",
            }}
            className="bg-white"
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker