import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function BasicDateCalendar({
  selectedDate,
  setSelectedDate,
  disabled,
}) {
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    console.log(newValue ? newValue.format("YYYY-MM-DD") : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        disabled={disabled}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
