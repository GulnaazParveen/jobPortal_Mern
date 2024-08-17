import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Home from './Home';
import './Layout.css';
import Categories from './Categories';
import Footer from '../footers/Footer';
import ImageSlider from './ImageSlider';
import { Outlet } from 'react-router-dom';
import ClientFeedback from './ClientFeedback';

const Layout = () => {
  const location = useLocation();
  // const isBrowseJob = location.pathname === '/browseJob';
 const dynamicContentBasedOnRoute=['/browseJob','/post','/postjobform', '/pages', '/blogs', '/contact']
  const containerRoutes = ['/browseJob','/post', '/pages','/postjobform', '/blogs', '/contact'];
  const dynamicTextBasedOnRoutes = ['/browseJob', '/post','/postjobform', '/pages', '/blogs', '/contact'];

  // Check if the current route matches any of the containerRoutes
  const isContainerRoute = containerRoutes.includes(location.pathname);
  const isDynamicTextBasedOnRoutes = dynamicTextBasedOnRoutes.includes(location.pathname);

  // check for target route then display dynamic content
  const isTargetRoute=dynamicContentBasedOnRoute.includes(location.pathname)

  // Determine the class for heros-container based on the route
  const containerClass = isContainerRoute ? 'banner-class' : 'heros-container';

  // Dynamic text mapping based on routes
  const dynamicTextDisplay = {
    browseJob: "4536+ Jobs Available",
    pages: "Candidate",
    blogs: "Blogs",
    contact: "Contact",
    default: ""
  };

  // Get the dynamic text based on the current route
  const dynamicText = dynamicTextDisplay[location.pathname.slice(1)] || dynamicTextDisplay.default;

  return (
    <section className="homepage">
      <div className={containerClass}>
        <Navbar />
        <Home isDynamicTextBasedOnRoutes={isDynamicTextBasedOnRoutes} dynamicText={dynamicText} />
      </div>
      <Outlet />
      {!isTargetRoute&& (
        <>
          <Categories />
          <ImageSlider />
          <ClientFeedback/>
        </>
      )}
      <Footer />
    </section>
  );
};

export default Layout;
