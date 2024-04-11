import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";

export default function BasicTimePicker({
  selectedTime,
  setSelectedTime,
  disabled,
}) {
  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    console.log(newValue ? newValue.format("HH:mm") : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        className="mb-2 w-full"
        label="Pick Time of Event"
        value={selectedTime}
        onChange={handleTimeChange}
        color="primary"
        disabled={disabled}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
