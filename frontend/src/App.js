import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Browsejob from './components/Browsejob/Browsejob';
import Contact from './components/contact/Contact';
import Pages from './components/pages/Pages';
import Blogs from './components/blogs/Blogs';
import Layout from './components/home/Layout';
import Post from './components/post/Post';
import PostJobForm from './components/post/PostJobForm';
import './global/global.css'
import Managejob from './components/post/Managejob';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Only render Categories in the index route */}
          <Route path="browseJob" element={<Browsejob />} />
          <Route path="pages" element={<Pages />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="post" element={<Post />} />
          <Route path="postjobform" element={<PostJobForm />} />
          <Route path="postjobform/:id" element={<PostJobForm />} />
          <Route path="managejob/:id" element={<Managejob />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
