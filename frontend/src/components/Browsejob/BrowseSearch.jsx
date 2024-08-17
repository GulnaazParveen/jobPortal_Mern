import React, { useState } from 'react'
import "./browseSearch.css"
import { useSearchParams } from 'react-router-dom'
const BrowseSearch = () => {
const [getinputValue,setInputValue]=useState("")
const [searchParams,setSearchParams]=useSearchParams()
const hanldechangeEvent = (event) => {
  setInputValue(event.target.value)
  const value=event.target.value
  setSearchParams({ query: value });
};
const handleSearch=()=>{
    console.log(searchParams);
}
const handlechangecatagories=(event)=>{
  searchParams.set("location",event.target.value)
  setSearchParams(searchParams)
}
  return (
    <div className="browse-search-container">
      <div className="browse-search">
        <input
          type="text"
          name="search"
          placeholder="search by job title"
          onChange={hanldechangeEvent}
          value={getinputValue}
        />
      </div>
      <select
        name="location"
        id="location"
        className="dropdownmenu"
        onChange={handlechangecatagories}
        value={searchParams}
      >
        <option value="Mumbai">Mumbai</option>
        <option value="london">london</option>
        <option value="Patna">Patna</option>
        <option value="Jaipur">Jaipur</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="new work"> new work</option>
      </select>
      <div className="post-btn" id="post-btn">
        <p className="link" onClick={handleSearch}>
          Search
        </p>
      </div>
    </div>
  );
}

export default BrowseSearch
