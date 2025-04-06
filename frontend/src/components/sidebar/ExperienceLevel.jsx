import React from 'react'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSearchParams } from "react-router-dom";

const ExperienceLevel = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChange = (event) => {
       if (event.target.value === "remove"){
          searchParams.delete("experienceLevel");
       }else{
        searchParams.set("experienceLevel", event.target.value);
       }   
      setSearchParams(searchParams);
    };
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label " className="location">
          ExperienceLevel
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value="Internship"
            control={<Radio />}
            label="Internship"
          />
          <FormControlLabel
            value="Junior"
            control={<Radio />}
            label="Junior"
          />
          <FormControlLabel
            value="Mid-level"
            control={<Radio />}
            label="Mid-level"
          />
          <FormControlLabel
            value="Senior"
            control={<Radio />}
            label="Senior"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default ExperienceLevel
