import React from 'react';
import { getDaysInMonth, leaveTypes } from './utils';

const MonthCalendar = ({ year, month, leaveData, onPrevMonth, onNextMonth, onYearChange }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const monthStart = new Date(year, month, 1);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, month, index + 1); // Ensure correct month index
    const dateKey = date.toISOString().split('T')[0];
    return { date, dateKey, leaves: leaveData[dateKey] || [] };
  });

  const renderDayHeaders = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames.map((day) => (
      <div key={day} className="day-title">
        {day}
      </div>
    ));
  };

  const renderDays = () => {
    const days = [];
    // Add blank days for the previous month's overflow
    for (let i = 0; i < monthStart.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    // Add actual days of the current month
    daysArray.forEach(({ date, dateKey, leaves }) => {
      const isToday = isCurrentMonth && date.getDate() === today.getDate();
      days.push(
        <div key={dateKey} className={`day ${isToday ? 'today' : ''}`}>
          <div className="date">{date.getDate()}</div>
          <div className="leaves">
            {leaves.map((leave, index) => (
              <div key={index} className={`leave ${leaveTypes[leave.status]}`}>
                {leave.leaveType}/{leave?.requestedBy?.name}
              </div>
            ))}
          </div>
        </div>
      );
    });

    // Ensure 6 rows by adding extra days if necessary
    while (days.length < 42) {
      days.push(<div key={`extra-${days.length}`} className="day empty"></div>);
    }

    return days;
  };

  return (
    <div className="">
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
  <button 
    className="pagination-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
    onClick={onPrevMonth}
  >
    Previous
  </button>
  <select 
    className="year-selector bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={year}
    onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
  >
    {Array.from({ length: 10 }, (_, index) => {
      const yearOption = 2024 + index;
      return (
        <option key={yearOption} value={yearOption}>
          {yearOption}
        </option>
      );
    })}
  </select>
  <button 
    className="pagination-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
    onClick={onNextMonth}
  >
    Next
  </button>
</div>

      <div className="calendar">
        {renderDayHeaders()}
        {renderDays()}
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color bg-green-500"></div>
          <span>Approved</span>
        </div>
        <div className="legend-item">
          <div className="legend-color bg-yellow-500"></div>
          <span>Pending</span>
        </div>
        <div className="legend-item">
          <div className="legend-color bg-red-500"></div>
          <span>Rejected</span>
        </div>
      </div>
    </div>
  );
};

export default MonthCalendar;
