import { FaPlus } from "react-icons/fa";
import Calendar from "./Calender";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { bookingsData } from "../../helper/data";
import isBetween from "dayjs/plugin/isBetween";
import { useMemo } from "react";
dayjs.extend(isBetween);

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SideBarCalendar = () => {
  // State for current month view and selected date
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Calculate the 7-day period (selected date + next 6 days)
  const { weekBookings, weekDates } = useMemo(() => {
    const endDate = selectedDate.add(6, "day");

    // Get all bookings for this 7-day period
    const filteredBookings = bookingsData.filter((booking) => {
      const bookingDate = dayjs(booking.date);
      return bookingDate.isBetween(
        selectedDate.startOf("day"),
        endDate.endOf("day"),
        null,
        "[]"
      );
    });

    // Generate the 7 days information
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = selectedDate.add(i, "day");
      return {
        day: date.format("ddd").toUpperCase(), // "MON", "TUE", etc.
        date: date.date(), // Day number (1-31)
        fullDate: date.format("YYYY-MM-DD"), // ISO format date
      };
    });

    return {
      weekBookings: filteredBookings,
      weekDates: dates,
    };
  }, [selectedDate]);

  // Calculate the first day of month (0-6 where 0=Sunday)
  const startDay = currentMonth.startOf("month").day();
  // Get number of days in current month
  const daysInMonth = currentMonth.daysInMonth();
  // Navigation handlers
  const handlePrevious = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, "month"));
  // Filter bookings for specific date
  const getBookingsForDate = (date: Dayjs) => {
    return bookingsData.filter((b) => dayjs(b.date).isSame(date, "day"));
  };
  // Group bookings by time range for the selected date
  const getTimeRangeSummary = () => {
    const bookings = getBookingsForDate(selectedDate);
    if (bookings.length === 0) return null;
    const times = bookings.map((b) => b.time);
    const start = times[0].split(" - ")[0]; // First booking start time
    const end = times[times.length - 1].split(" - ")[1]; // Last booking end time
    return `${start} - ${end}`;
  };
  // Count bookings by status for the selected date
  const getStatusCounts = () => {
    const counts = {
      Active: 0,
      Pending: 0,
      Completed: 0,
      Rescheduled: 0,
      Cancelled: 0,
    };
    getBookingsForDate(selectedDate).forEach((booking) => {
      counts[booking.status] += 1;
    });
    return counts;
  };

  return (
    <>
      <div className="bg-[#1E1E1E] h-full flex flex-col gap-5 w-3/12 p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#ED6B60] rounded-full"></span>
            <span className="h-2 w-2 bg-[#F5C250] rounded-full"></span>
            <span className="h-2 w-2 bg-[#52A842] rounded-full"></span>
          </div>
          <span className="h-8 w-8 flex justify-center items-center rounded-lg bg-[#333332]">
            <FaPlus fontSize={10} className="text-white" />
          </span>
        </div>
        <div className="flex flex-col gap-5 text-white">
          {/* Calendar Header */}
          <div className="flex justify-between">
            <div>
              <h1>
                {currentMonth.format("MMMM")}{" "}
                <span className="text-primary text-2xl">
                  {currentMonth.year()}
                </span>
              </h1>
            </div>
            <div className="flex items-center">
              <BiChevronLeft
                fontSize={30}
                onClick={handlePrevious}
                className="cursor-pointer hover:text-primary transition-colors"
              />
              <BiChevronRight
                fontSize={30}
                onClick={handleNext}
                className="cursor-pointer hover:text-primary transition-colors"
              />
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {/* Empty cells for days before the 1st of the month */}
            {[...Array(startDay)].map((_, idx) => (
              <div key={`empty-${idx}`} className="h-12"></div>
            ))}

            {/* Calendar days */}
            {[...Array(daysInMonth)].map((_, day) => {
              const date = currentMonth.date(day + 1);
              const bookings = getBookingsForDate(date);
              const isSelected = selectedDate.isSame(date, "day");
              const isToday = dayjs().isSame(date, "day");

              return (
                <div
                  key={day + 1}
                  className={`h-10 p-1 rounded flex flex-col items-center justify-between
                ${isSelected ? "border-2 border-primary" : ""}
                ${isToday ? "bg-[#444443]" : "bg-[#333332]"}
                hover:bg-[#3a3a39] cursor-pointer transition-colors`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className={`text-xs ${isToday ? "font-bold" : ""}`}>
                    {day + 1}
                  </div>
                  <div className="flex justify-center gap-0.5">
                    {bookings.slice(0, 3).map((b, i) => (
                      <span
                        key={i}
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: b.color }}
                      />
                    ))}
                    {bookings.length > 3 && (
                      <span className="text-[8px] opacity-70">
                        +{bookings.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Date Details */}
          <div className="">
            <h1 className="text-center text-primary text-2xl my-3">
              {selectedDate.format("D MMMM YYYY").toUpperCase()}
            </h1>

            {/* Time range summary */}
            {getTimeRangeSummary() ? (
              <p className="text-center text-lg text-[#71717A] font-semibold">
                {getTimeRangeSummary()}
              </p>
            ) : (
              <p className="text-white text-xs text-center">
                No bookings to display
              </p>
            )}
            {/* Booking status summary */}
            <div className="flex flex-col gap-3 mt-4">
              {Object.entries(getStatusCounts()).map(([status, count]) => {
                if (count === 0) return null;
                const statusData = bookingsData.find(
                  (b) => b.status === status
                );
                return (
                  <div key={status} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: statusData?.color || "#ccc" }}
                    />
                    <h1 className="text-xs">
                      {count} {status} Booking{count !== 1 ? "s" : ""}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* passed as props here */}
      <Calendar
        selectedDate={selectedDate}
        weekBookings={weekBookings}
        weekDates={weekDates}
      />
    </>
  );
};

export default SideBarCalendar;
