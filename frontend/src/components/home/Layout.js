import React from "react";
import { useLocation, useMatch } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "./Home";
import "./Layout.css";
import Categories from "./Categories";
import Footer from "../footers/Footer";
import ImageSlider from "./ImageSlider";
import { Outlet } from "react-router-dom";
import ClientFeedback from "./ClientFeedback";
import Managejob from "../post/Managejob";

const Layout = () => {
  const location = useLocation();
  // const isBrowseJob = location.pathname === '/browseJob';

  const dynamicContentBasedOnRoute = [
    "/browseJob",
    "/post",
    "/postjobform",
    "/blogs",
    "/contact",
  ];
  const containerRoutes = [
    "/browseJob",
    "/post",
    "/postjobform",
    "/blogs",
    "/contact",
  ];
  const dynamicTextBasedOnRoutes = [
    "/browseJob",
    "/post",
    "/postjobform",
    "/blogs",
    "/contact",
  ];

   const isManageJobRoute = useMatch("/managejob/:id");

  // Check if the current route matches any of the containerRoutes
  const isContainerRoute =containerRoutes.includes(location.pathname) || isManageJobRoute;;
  const isDynamicTextBasedOnRoutes = dynamicTextBasedOnRoutes.includes(
    location.pathname
  );

  // check for target route then display dynamic content
 const isTargetRoute =dynamicContentBasedOnRoute.includes(location.pathname) || isManageJobRoute;


  // Determine the class for heros-container based on the route
  const containerClass = isContainerRoute ? "banner-class" : "heros-container";

  // Dynamic text mapping based on routes
  const dynamicTextDisplay = {
    browseJob: "4536+ Jobs Available",
    postjobform: "Enter post job details",
    managejob: "Manage jobs", // If you want a general manage jobs text
    blogs: "Blogs",
    contact: "Contact",
    default: "",
  };

  // Get the dynamic text based on the current route
  const dynamicText =
    dynamicTextDisplay[location.pathname.slice(1)] ||
    dynamicTextDisplay.default;

  return (
    <section className="homepage">
      <div className={containerClass}>
        <Navbar />
        <Home
          isDynamicTextBasedOnRoutes={isDynamicTextBasedOnRoutes}
          dynamicText={dynamicText}
        />
      </div>
      <Outlet />
      {!isTargetRoute && (
        <>
          <Categories />
          <ImageSlider />
          <ClientFeedback />
        </>
      )}
      <Footer />
    </section>
  );
};

export default Layout;
