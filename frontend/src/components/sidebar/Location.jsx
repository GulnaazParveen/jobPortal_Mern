import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSearchParams } from "react-router-dom";

const Location = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (event) => {
    searchParams.set("location", event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label" className="location">
          Location
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="London" control={<Radio />} label="London" />
          <FormControlLabel value="Mumbai" control={<Radio />} label="Mumbai" />
          <FormControlLabel
            value="New York"
            control={<Radio />}
            label="New York"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Location;
