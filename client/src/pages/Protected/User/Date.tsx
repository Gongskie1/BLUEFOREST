import {Stack, TextField} from "@mui/material";
import  DatePicker  from "@mui/x-date-pickers";
import { useState } from "react";

const Date = () => {
  const [selectedDate, setSelectedDate] = useState<Date |null>(null);
  return (
    <Stack spacing={4} sx={{width:"250px"}}>
      <DatePicker
        label="Date picker"
        renderInput
      />
    </Stack>
  )
}

export default Date