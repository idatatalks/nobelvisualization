import { Paper, Slider } from "@mui/material";
import { useState } from "react";

export function FilterSlide(props) {
  const { range, onSetFilter, data, min, max } = props;
  const [value, setValue] = useState(range);
  const handleSliderChange = (event, newValue) => {
    console.log("On Slider Change:", newValue);
    setValue(newValue);
  };
  const handleSliderCommitChange = (event, newValue) => {
    console.log("On Slider Commit Change:", newValue);
    onSetFilter({ ...data.filters, year: newValue });
  };

  return (
    <Paper
      elevation={10}
      sx={{
        textAlign: "center",
        pt: 2,
        px: 3,
      }}
    >
      <Slider
        defaultValue={range}
        value={value}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommitChange}
        valueLabelDisplay="on"
        min={min}
        max={max}
        step={1}
        marks
        disableSwap
        sx={{ mt: 0 }}
      ></Slider>
    </Paper>
  );
}
