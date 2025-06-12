
import { Dayjs } from "dayjs";

type BookingStatus =
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
}

export interface CustomCalendarProps {
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  bookingsData: Bookings[];  
}