import React from 'react'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSearchParams } from 'react-router-dom';

const EmployementType = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const handleChange = (event) => {
   searchParams.set("employmentType", event.target.value);
   setSearchParams(searchParams);
 };
  return (
    <div>
      <FormControl >
        <FormLabel id="demo-radio-buttons-group-label " className="location">
          EmploymentTYpe
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value="Part-time"
            control={<Radio  />}
            label="Part-time"
          />
          <FormControlLabel
            value="Temporary"
            control={<Radio  />}
            label="Temporary"
          />
          <FormControlLabel
            value="Full-time"
            control={<Radio  />}
            label="Full-time"
          />
          <FormControlLabel
            value="Contract"
            control={<Radio  />}
            label="Contract"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default EmployementType
