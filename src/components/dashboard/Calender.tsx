import React from "react";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// Generate times from 7AM to 9PM
const times = Array.from({ length: 15 }, (_, i) => {
  const hour = 7 + i;
  return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
});

// Mock dates for the current week (Sun 23 - Sat 29)
const dates = [23, 24, 25, 26, 27, 28, 29];

const bookings = [
  { day: "Mon", time: "9AM", title: "Booking made" },
  { day: "Thu", time: "1PM", title: "Booking made" },
  { day: "Fri", time: "3PM", title: "Booking made" },
  { day: "Sun", time: "8AM", title: "Booking made" },
];

type Day = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
type Time = `${number}${"AM" | "PM"}`;

const getSlotStyle = (day: Day, time: Time): string => {
  const booked = bookings.find((b) => b.day === day && b.time === time);

  if (booked) {
    return "bg-[#FFF1F1] border border-[#FF5859] text-[#FF5859] font-medium";
  }

  if (day === "Thu") return "bg-[#EFF6FF]";
  if (day === "Fri") return "bg-[#FAFAFA]";

  return "bg-[#FAFAFA]";
};

const Calendar = () => {
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
          {days.map((day, index) => (
            <div
              key={day}
              className={`flex flex-col font-bold text-[#1E1E1E] py-2 px-2 ${
                index !== 0 ? "border-l-1 border-l-[#E0E0E0]" : ""
              } ${
                day === "THU"
                  ? "bg-[#EFF6FF]"
                  : day === "SAT"
                  ? "bg-[#F7F7F7]"
                  : ""
              }`}
            >
              <span className="text-[#71717A] text-[8px]">{day}</span>
              <span className="text-sm text-[#1E1E1E]">{dates[index]}</span>
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
              {days.map((day) => {
                const booking = bookings.find(
                  (b) => b.day === day && b.time === time
                );

                return (
                  <div
                    key={`${day}-${time}`}
                    className={`text-center border border-gray-200 p-8 ${
                      day === "THU"
                        ? "bg-[#EFF6FF]"
                        : day === "SUN"
                        ? "bg-[#FAFAFA]"
                        : day === "SAT"
                        ? "bg-[#F7F7F7]"
                        : "bg-white"
                    } ${
                      booking
                        ? "bg-[#FFF1F1] border-[#FF5859] text-[#FF5859] font-medium"
                        : ""
                    }`}
                  >
                    {booking ? booking.title : ""}
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
