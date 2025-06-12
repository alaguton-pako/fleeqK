import { Dayjs } from "dayjs";

export type BookingStatus =
  | "Active"
  | "Pending"
  | "Completed"
  | "Rescheduled"
  | "Cancelled";

export interface Bookings {
  date: string;
  time: string;
  status: BookingStatus;
  color: string;
  title?: string;
}

export interface CustomCalendarProps {
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  bookingsData: Bookings[];
}

export interface CalendarProps {
  selectedDate: Dayjs;
  weekBookings: Bookings[];
  weekDates: {
    day: string;
    date: number;
    fullDate: string;
  }[];
}