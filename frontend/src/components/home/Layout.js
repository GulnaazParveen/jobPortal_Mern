import React, { useMemo } from "react";
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

  // Define the routes you want to check
  const matchManageJob = useMatch("/managejob/:id");
  const matchEmployerChat = useMatch("/employer/chat/:id");
  const matchUserChat = useMatch("user/chat/:id");

  // Check if any employer-related routes match
  const isManageJobRoute = matchManageJob || matchEmployerChat;
  const isManageChat = matchUserChat !== null;

 const isDynamicTextBasedOnRoutes =
   dynamicTextBasedOnRoutes.includes(location.pathname) ||
   isManageJobRoute ||
   isManageChat;


  // Define user-related routes explicitly
  const isUserRelatedRoute = isManageJobRoute || isManageChat;

  // Check for routes that match containerRoutes or any user-related routes
  const isContainerRoute =
    containerRoutes.includes(location.pathname) || isUserRelatedRoute;

  // Define isTargetRoute to exclude certain user-related routes if needed
  const isTargetRoute =
    dynamicContentBasedOnRoute.includes(location.pathname) &&
    !isUserRelatedRoute;

  // Determine the class for heros-container based on the route
  const containerClass = isContainerRoute ? "banner-class" : "heros-container";

  // Dynamic text mapping based on routes
  const dynamicTextDisplay = {
    browseJob: "4536+ Jobs Available",
    postjobform: "Enter post job details",
    managejob: "Track and Manage Jobs",
    chat: "all the best",
    blogs: "Blogs",
    contact: "Contact",
    default: "",
  };

  // Get the dynamic text based on the current route
 const dynamicText =
   dynamicTextDisplay[location.pathname.slice(1)] ||
   (matchManageJob
     ? dynamicTextDisplay.managejob
     : matchEmployerChat || matchUserChat
     ? dynamicTextDisplay.chat
     : dynamicTextDisplay.default);


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
      {!isTargetRoute && !isUserRelatedRoute && (
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
