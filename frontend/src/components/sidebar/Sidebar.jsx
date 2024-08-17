import React from "react";
import Location from "./Location";
import "./sidebar.css";
  import Divider from "@mui/material/Divider";
  import List from "@mui/material/List";
import EmployementType from "./EmployementType";
import ExperienceLevel from "./ExperienceLevel";

const Sidebar = () => {
  const style = {
    py: 2,
    mr:5,
    width: "100%",
    maxWidth: 380,
    borderRadius: 2,
    borderColor: "divider",
    backgroundColor: "background.paper",
  };
  return (
    <div className="sidebar-container">
      <h3>Filters</h3>
      <List sx={style}>
        <Divider component="li" />
      </List>
      <Location />
      <List sx={style}>
        <Divider component="li" />
      </List>
      <EmployementType />
      <List sx={style}>
        <Divider component="li" />
      </List>
      <ExperienceLevel/>
    </div>
  );
};

export default Sidebar;
