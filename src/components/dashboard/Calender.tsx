import React from "react";
import dayjs from "dayjs";
import type { CalendarProps } from "../../helper/types";

// Generate times from 7AM to 9PM
const times = Array.from({ length: 15 }, (_, i) => {
  const hour = 7 + i;
  return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
});

// Helper to normalize time formats ("9AM" → "9 AM")
const normalizeTime = (time: string) => time.replace(/(\d+)([AP]M)/, "$1 $2");

// Helper to extract just the hour part ("9 AM" → "9", "11 AM" → "11")
const extractHour = (time: string) => time.split(" ")[0];

const Calendar = ({ weekBookings, weekDates }: CalendarProps) => {
  // Function to check if a time slot is booked
  const isTimeSlotBooked = (day: string, time: string) => {
    return weekBookings.some((booking) => {
      const bookingDay = dayjs(booking.date).format("ddd").toUpperCase();
      const [startTime, endTime] = normalizeTime(booking.time)
        .split(" - ")
        .map(extractHour);

      const currentHour = extractHour(time);
      return (
        bookingDay === day && currentHour >= startTime && currentHour < endTime
      );
    });
  };

  // Function to get booking title for a time slot
  const getBookingTitle = (day: string, time: string) => {
    const booking = weekBookings.find((booking) => {
      const bookingDay = dayjs(booking.date).format("ddd").toUpperCase();
      const [startTime] = normalizeTime(booking.time)
        .split(" - ")
        .map(extractHour);

      return bookingDay === day && extractHour(time) === startTime;
    });
    return booking?.title || "Booked";
  };

  // Function to determine cell background color
  const getCellBackground = (day: string) => {
    switch (day) {
      case "THU":
        return "bg-[#EFF6FF]";
      case "SUN":
        return "bg-[#FAFAFA]";
      case "SAT":
        return "bg-[#F7F7F7]";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="w-9/12 bg-white py-4 h-full overflow-auto scrollbar-hide">
      <div className="flex items-center justify-end">
        <span className="py-1 px-6 text-white bg-primary rounded-lg">Week</span>
        <span className="py-1 px-6 text-[#71717A] rounded-lg">Month</span>
      </div>
      <div className="py-6 overflow-auto">
        <div className="grid grid-cols-8 w-full">
          {/* Column headers */}
          <div className="font-bold text-center py-2 text-[#1E1E1E]"></div>
          {weekDates.map((dayObj, index) => (
            <div
              key={dayObj.day}
              className={`flex flex-col font-bold text-[#1E1E1E] py-2 px-2 ${
                index !== 0 ? "border-l-1 border-l-[#E0E0E0]" : ""
              } ${getCellBackground(dayObj.day)}`}
            >
              <span className="text-[#71717A] text-[8px]">{dayObj.day}</span>
              <span className="text-sm text-[#1E1E1E]">{dayObj.date}</span>
            </div>
          ))}

          {/* Time rows */}
          {times.map((time) => (
            <React.Fragment key={time}>
              {/* Time label */}
              <div className="text-xs text-center py-2 font-medium bg-white text-[#71717A]">
                {time}
              </div>

              {/* Time slots for each day */}
              {weekDates.map((dayObj) => {
                const isBooked = isTimeSlotBooked(dayObj.day, time);
                const isStartTime = weekBookings.some((booking) => {
                  const bookingDay = dayjs(booking.date)
                    .format("ddd")
                    .toUpperCase();
                  const [startTime] = normalizeTime(booking.time)
                    .split(" - ")
                    .map(extractHour);
                  return (
                    bookingDay === dayObj.day && startTime === extractHour(time)
                  );
                });

                return (
                  <div
                    key={`${dayObj.day}-${time}`}
                    className={`text-center border border-gray-200 py-8  ${getCellBackground(
                      dayObj.day
                    )} ${
                      isBooked
                        ? "bg-[#FFF1F1] border-l-2 border-l-[#FF5859] text-[#FF5859] font-semibold text-xs"
                        : "border-l-0 bg-[#FFFF]"
                    }`}
                  >
                    {isStartTime
                      ? getBookingTitle(dayObj.day, time)
                      : isBooked
                      ? "Booking made"
                      : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
