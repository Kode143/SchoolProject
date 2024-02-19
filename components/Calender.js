import React, { useState } from 'react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getMonthYearString = () => {
        const options = { month: 'long', year: 'numeric' };
        return currentDate.toLocaleDateString('en-US', options);
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const blanks = Array(firstDayOfMonth).fill(0);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        const today = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        return (
            <div>
                <h2 className="text-xl font-bold mb-2">{getMonthYearString()}</h2>
                <div className="grid grid-cols-7 gap-1">
                    <div className="font-bold text-center">Sun</div>
                    <div className="font-bold text-center">Mon</div>
                    <div className="font-bold text-center">Tue</div>
                    <div className="font-bold text-center">Wed</div>
                    <div className="font-bold text-center">Thu</div>
                    <div className="font-bold text-center">Fri</div>
                    <div className="font-bold text-center">Sat</div>
                    {blanks.map((_, index) => (
                        <div key={`blank-${index}`}></div>
                    ))}
                    {days.map((day) => {
                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                        return (
                            <div key={`day-${day}`} className={`text-center p-2 ${isToday ? 'bg-white text-black rounded-full' : ''}`}>
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-md shadow-md">
            <div className="flex justify-between mb-4">
                <button onClick={goToPreviousMonth} className="px-2 py-1 rounded-md bg-blue-500 text-white focus:outline-none focus:bg-blue-600">
                    Previous
                </button>
                <button onClick={goToNextMonth} className="px-2 py-1 rounded-md bg-blue-500 text-white focus:outline-none focus:bg-blue-600">
                    Next
                </button>
            </div>
            {renderCalendar()}
        </div>
    );
};

export default Calendar;
