import React, { useEffect, useState } from "react";
import "./post.css";
import postjob from "../images/jobpost.jpg";
import smilingHrGreeting from "../images/smilingHrGreeting.jpg";
import { Divider, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import EmployerRegister from "../employer/EmployerRegister";
import { LoginEmployer } from "../../features/EmployerSlice";
import EmployerLogin from "../employer/EmployerLogin";

const Post = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const [ismodelopen, setModelOpen] = useState(false);

  //  after sign in our result is store in redux store now  access the data from redux store
  //  const employerAccountDetails = useSelector(
  //    (state) => state.employer.employer
  //  );

  // const handleEmployerSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const employerSignData = result.user;
      
  //     if (!employerSignData) {
  //       throw new Error("No user data found");
  //     }
  //     dispatch(
  //       setEmployer({
  //         uid: employerSignData.uid,
  //         displayName: employerSignData.displayName,
  //         email: employerSignData.email,
  //         photoURL: employerSignData.photoURL,
  //       })
  //     );
  //     console.log("Sign-in successful", employerSignData); // Debug: Log successful sign-in data
  //    const config = {
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //    };
  //    const body = {
  //      employerId: employerSignData.uid,
  //      EmployerName: employerSignData.displayName,
  //      email: employerSignData.email,
  //      EmployerPhotoUrl: employerSignData.photoURL,
  //    };

  //    const employerData = await axios.post(
  //      "http://localhost:8000/api/employerLogin",
  //      body,
  //      config
  //    );
  //    console.log(employerData);
  //     // Navigate to post job form after successful sign-in
  //     navigate("/postjobform");
  //   } catch (error) {
  //     console.error("Error signing in: ", error);
  //     dispatch(clearEmployer());
  //   }
  // };
  
   const [isSignIn, setIsSignIn] = useState(true);

   const handleSignUpClick = () => {
     setIsSignIn(false);
   };
   // Handlers for switching tabs
   const handleSignInClick = () => {
     setIsSignIn(true);
   };

 const [isRegister,setRegisterEmployer]=useState(false)
  const [employerRegisterData,setEmployerRegister]=useState({
    name:"",
    email:"",
    password:"",
    mobileNumber:"",
    Address:"",                                                                                            
  })

  const handleRegisterEmployer=(e)=>{
    e.preventDefault()
    axios.post(
        "http://localhost:8000/api/v1/employers/registerEmployer",
        employerRegisterData
      )
      .then((response) => console.log("register successfully", response.data))
      .catch((error) => console.log("error in register",error));
      setRegisterEmployer(true);
  }

  const handleChange = (e) => {
    setEmployerRegister({
      ...employerRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  // login employer 

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    setLoginData({
      ...loginData, 
      [e.target.name]: e.target.value, 
    });
  };
  // Handle login user logic
  const handleLoginEmployer = (e) => {
    e.preventDefault();
    dispatch(LoginEmployer(loginData));

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
                width: 500,
                height: 500,
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
              <div className="formModal">
                <div className="tab-header">
                  <div
                    className={isSignIn ? "active active-styling" : ""}
                    onClick={handleSignInClick}
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      textAlign: "center",
                      width: "300px",
                      height: "40px",
                    }}
                  >
                    Sign In
                  </div>
                  <div
                    className={!isSignIn ? "active active-styling" : ""}
                    onClick={handleSignUpClick}
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      textAlign: "center",
                      width: "300px",
                      height: "40px",
                    }}
                  >
                    Sign Up
                  </div>
                </div>

                <div className="form-content">
                  {isSignIn ? (
                    <EmployerLogin
                      handleLoginEmployer={handleLoginEmployer}
                      handleChangeLogin={handleChangeLogin}
                      loginData={loginData}
                    />
                  ) : (
                    <EmployerRegister
                      handleRegisterEmployer={handleRegisterEmployer}
                      handleChange={handleChange}
                      employerRegisterData={employerRegisterData}
                      setRegisterEmployer={setEmployerRegister}
                      isRegister={isRegister}
                    />
                  )}
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
