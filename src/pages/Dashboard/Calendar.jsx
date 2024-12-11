import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for calendar events
const events = [
  { id: 1, date: "2024-10-04", title: "La fine dell'influenza", status: "draft", img: "./images/fineinfluenza.png"},
  { id: 2, date: "2024-10-07", title: "Il peso psicologico", status: "scheduled", img: "./images/ilpesopsicologico.png"},
  { id: 3, date: "2024-10-15", title: "L'inverno più caldo", status: "scheduled", img: "./images/invernopiùcaldo.png"},
  { id: 4, date: "2024-10-21", title: "Messaggi nella bottiglia", status: "draft", img: "./images/messagginellabottiglia.png"},
  { id: 5, date: "2024-10-26", title: "Testate Nucleari", status: "scheduled", img: "./images/testatenucleari.png"},
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarEvent = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-2 rounded-md text-sm cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3  rounded-full relative bottom-8 left-40 ${
            event.status === "draft" ? "bg-gray-400" : "bg-green-500"
          }`}
        />
        
      </div>
      <div className="flex justify-center relative w-[100%] h-[100%] mt-1">
        <img src={event.img} alt={event.title} className='top-0 left-0 w-1/2 h-1/2 object-fit'/>
      </div>
      {isHovered && (
        <motion.div
          className={`absolute inset-0 bg-black ${event.status === "draft" ? "bg-gray-400" : "bg-green-500"} bg-opacity-50 flex items-center justify-center rounded-md`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-white font-bold">{event.title}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // 2024-10-01
  
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };
  
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split("T")[0];
      const dayEvents = events.filter((event) => event.date === dateString);

      days.push(
        <div key={day} className="h-48 border rounded-md overflow-y-auto p-2">
          <div className="font-semibold mb-1">{day}</div>
          {dayEvents.map((event) => (
            <CalendarEvent key={event.id} event={event} />
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevMonth}>&lt;</button>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;