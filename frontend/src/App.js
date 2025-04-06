import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import "./global/global.css";
import UserRouteProtected from "./protectRoute/UserRouteProtected";
import Browsejob from "./components/Browsejob/Browsejob";
import Blogs from "./components/blogs/Blogs"
import Post from "./components/post/Post";
import Contact from "./components/contact/Contact";
import Layout from "./components/home/Layout";
import PostJobForm from "./components/post/PostJobForm";
import Managejob from "./components/post/Managejob";
import Chat from "./components/messageNotification/Chat";
function App() {
 const [employer, setEmployer] = useState(null);
 const [loading, setLoading] = useState(true); // Initialize loading state

 useEffect(() => {
   const storedEmployer = localStorage.getItem("employer");
   if (storedEmployer) {
     setEmployer(JSON.parse(storedEmployer));
   }   
   setLoading(false); // Set loading to false once data is fetched
 }, []);
 
 
 if (loading) {
   return <div>Loading...</div>; // Display this while employer data is being fetched
 }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="browseJob" element={<Browsejob />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="post" element={<Post />} />

          <Route element={<UserRouteProtected />}>
            <Route path="user/chat/:id" element={<Chat />} />
          </Route>
          <Route
            path="postjobform"
            element={employer ? <PostJobForm /> : <Outlet />}
          />
          <Route
            path="manageJob/:id"
            element={employer ? <Managejob /> : <Outlet />}
          />
          <Route path="employer/chat/:id" element={employer ? <Chat /> : ""} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;