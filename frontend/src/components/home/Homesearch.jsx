import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Homesearch = () => {
const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    const experienceLevelParam = searchParams.get("experienceLevel") || "";
    const locationParam = searchParams.get("location") || "";

    setQuery(queryParam);
   setSelectedExperienceLevel(experienceLevelParam);
    setSelectedLocation(locationParam);
  }, [searchParams]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleExperienceLevelChange = (event) => {
    setSelectedExperienceLevel(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearch = () => {
    setSearchParams({
      query,
      experienceLevel: selectedExperienceLevel,
      location: selectedLocation,
    });
    navigate(
      `/browseJob?query=${query}&experienceLevel=${selectedExperienceLevel}&location=${selectedLocation}`
    );
  };

  return (
    <div>
      <div className="search-filter-btn">
        <input
          type="text"
          className="search-input"
          placeholder="Search keyword"
          onChange={handleInputChange}
          value={query}
        />
        <select
          name="location"
          id="location"
          className="dropdownmenu"
          onChange={handleLocationChange}
          value={selectedLocation}
        >
          <option value="">Select Location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="London">London</option>
          <option value="Patna">Patna</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="New York">New York</option>
        </select>
        <select
          name="experienceLevel"
          id="experienceLevel"
          className="dropdownmenu"
          onChange={handleExperienceLevelChange}
          value={selectedExperienceLevel}
        >
          <option value="Internship">Internship</option>
          <option value="Junior">Junior</option>
          <option value="Mid-level">Mid-level</option>
          <option value="">Entry-level</option>
          <option value="Senior">Senior</option>
        </select>
        <div className="post-btn" onClick={handleSearch}>
          <p className="link">Find a Job</p>
        </div>
      </div>
    </div>
  );
};

export default Homesearch;
