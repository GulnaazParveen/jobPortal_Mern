import React, { useState } from "react";
import "./post.css";
import postjob from "../images/jobpost.jpg";
import smilingHrGreeting from "../images/smilingHrGreeting.jpg";
import { Divider, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmployer, clearEmployer } from "../../features/EmployerSlice";
import {useNavigate} from "react-router-dom"
import axios from "axios";
const Post = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const [ismodelopen, setModelOpen] = useState(false);

  //  after sign in our result is store in redux store now  access the data from redux store
   const employerAccountDetails = useSelector(
     (state) => state.employer.employer
   );

  const handleEmployerSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const employerSignData = result.user;
      
      if (!employerSignData) {
        throw new Error("No user data found");
      }
      dispatch(
        setEmployer({
          uid: employerSignData.uid,
          displayName: employerSignData.displayName,
          email: employerSignData.email,
          photoURL: employerSignData.photoURL,
        })
      );
      console.log("Sign-in successful", employerSignData); // Debug: Log successful sign-in data
     const config = {
       headers: {
         "Content-Type": "application/json",
       },
     };
     const body = {
       employerId: employerSignData.uid,
       EmployerName: employerSignData.displayName,
       email: employerSignData.email,
       EmployerPhotoUrl: employerSignData.photoURL,
     };

     const employerData = await axios.post(
       "http://localhost:8000/api/employerLogin",
       body,
       config
     );
     console.log(employerData);
      // Navigate to post job form after successful sign-in
      navigate("/postjobform");
    } catch (error) {
      console.error("Error signing in: ", error);
      dispatch(clearEmployer());
    }
  };


  return (
    <div>
      <div className="post-container">
        <div className="post-image">
          <img src={postjob} alt="" />
        </div>
        <div className="post-content">
          <h1 className="post-text">
            Let's hire your suitable candidate. Fast.
          </h1>
          <div className="ctn-btn" onClick={() => setModelOpen(true)}>
            <p>Post a free job</p>
          </div>
          <Modal
            open={ismodelopen}
            onClose={() => setModelOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              className="form-container"
              sx={{
                width: 600,
                height: 400,
                bgcolor: "#ffffff",
                p: 3,
                position: "relative",
              }}
            >
              <IconButton
                aria-label="close"
                onClick={() => setModelOpen(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <div className="google-sign-container">
                <div className="google-item">
                  <div className="google-image" onClick={handleEmployerSignIn}>
                    <img
                      src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
                      alt="Google sign-in"
                      style={{ width: "100%", height: "50px" }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      width: "250px",
                      background: "#f5f5f5",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleEmployerSignIn}
                  >
                    Sign in with Google
                  </p>
                </div>
                <Divider />
                <div className="form-container">
                  <form action="" className="form">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      style={{
                        width: "300px",
                        margin: "10px 0",
                        height: "35px",
                      }}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      style={{
                        width: "100%",
                        margin: "10px 0",
                        height: "35px",
                      }}
                    />
                  </form>
                </div>
                <div className="form-bottom">
                  <p
                    style={{ textTransform: "capitalize", fontSize: "1.1rem" }}
                  >
                    new here ?
                  </p>
                  <a href="" style={{ textDecoration: "none" }}>
                    Signup
                  </a>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="step-follow-post-container">
        <div className="post-items">
          <h3 className="step-number">1</h3>
          <h1 className="step-heading">Create your free account</h1>
          <p className="post-content-text">
            All you need is your email address to create an account and start
            building your job post.
          </p>
        </div>
        <div className="post-items">
          <h3 className="step-number">2</h3>
          <h1 className="step-heading">Build your job post</h1>
          <p className="post-content-text">
            Then just add a title, description and location to your job post,
            and you're ready to go.
          </p>
        </div>
        <div className="post-items">
          <h3 className="step-number">3</h3>
          <h1 className="step-heading">Post your job</h1>
          <p className="post-content-text">
            After you post your job, use our state-of-the-art tools to help you
            find dream talent.
          </p>
        </div>
      </div>
      <div className="post-feedback-container">
        <div className="">
          <p className="feedback-content">
            We have found Indeed very helpful in finding the right candidate for
            our organization... it saves time and energy of both the candidates
            as well as the recruiter."
          </p>
        </div>
        <div className="post-feedback-image">
          <img src={smilingHrGreeting} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Post;
