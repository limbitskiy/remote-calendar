import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments } from "../store/appointmentSlice";

function isSameDate(date, appointment) {
  return new Date(appointment.date).getDate() === date.day && new Date(appointment.date).getMonth() === date.month && new Date(appointment.date).getFullYear() === date.year;
}

export default function Cal({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() });
  const [date, setDate] = useState(null);
  const dispatch = useDispatch();

  const appointments = useSelector((state) => state.appointments.value);

  useEffect(() => {
    dispatch(fetchAppointments(currentDate));
  }, [currentDate]);

  // set date class
  const dateTemplate = (date) => {
    if (appointments?.length) {
      const sameDate = appointments.find((app) => isSameDate(date, app));
      return <span className={sameDate ? "is-appointment" : ""}>{date.day}</span>;
    }
    return date.day;
  };

  function onMounthChange(e) {
    setCurrentDate(e);
  }

  return <Calendar value={date} dateTemplate={dateTemplate} inline style={{ width: "100%" }} onChange={(e) => onDateSelect(e.value)} onMonthChange={onMounthChange} />;
}
