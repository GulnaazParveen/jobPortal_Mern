
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import "./navbar.css";
import { Divider, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-responsive-modal/styles.css";

import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../features/Features";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

// import { clearEmployer } from "../../features/EmployerSlice";
import axios from "axios";
import Login from "./authentication/LoginUser";
import UserRegister from "./authentication/UserRegister";
import { loginUser,logoutUser} from "../../features/authSlice";
import { logoutEmployer } from "../../features/EmployerSlice";
import MessageNotification from "../messageNotification/MessageNotification";

const Navbar = () => {
  const [ismodelopen, setModelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  
  const { user, loading, error } = useSelector((state) => state.auth); // Access auth state

  // register user logic
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [IsRegisterUser, setRegisterUser] = useState(true);
  const [Error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleUserRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/users/registerUser`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User registered successfully", response.data);
      setRegisterUser(true);
    } catch (error) {
      console.error("Error registering user", error);
      setError("Error registering user");
    }
  };

  // login user logic
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
  const handleLoginUser = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData)); 
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // switching tab
  const handleSignUpClick=()=>{
  setRegisterUser(false)
  }

  const handleSignInClick=()=>{
    setRegisterUser(true)
  }

  // Dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [getIndividualJobs, setJobsBasedEmployerId] = useState([]);

  const { employerId } = useParams();
  //  console.log(id);
  useEffect(() => {
    if (employerId) {
      axios
        .get(`${API_URL}/api/employer/${employerId}`)
        .then((response) => {
          console.log(response.data); // Log the response to check the data structure
          setJobsBasedEmployerId(response.data);
        })
        .catch((error) => console.error("Error fetching job data:", error));
    }
  }, [employerId]);

  const handleLogoutEmployer = () => {
    dispatch(logoutEmployer());
  };
  // // custom fetching data from form
  const employerdata = useSelector((state) => state.employer.employer);

  return (
    <div className="container">
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-left">
          <div className="search">
            <SearchIcon className="search-icon" />
          </div>
          <div className="jobportal-title">
            <h1 className="main-title">Job Board</h1>
            <p className="title-subtext">Find your dream job</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => {
                  return { color: isActive ? "#00D363" : "" };
                }}
                className="link"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browseJob"
                style={({ isActive }) => {
                  return { color: isActive ? "#00D363" : "" };
                }}
                className="link"
              >
                Browse Job
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="nav-right">
          <div className="account-btn">
            {user ? (
              <>
                <MessageNotification user={user} />
                <img
                  src={user.avatar}
                  alt={user.userName}
                  id="unique-image"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  style={{
                    borderRadius: "50%",
                    height: "60px",
                    width: "60px",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <p
                className="link"
                onClick={() => {
                  setModelOpen(true);
                }}
              >
                Signup
              </p>
            )}
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
                width: 550,
                height: 500,
                bgcolor: " #ffffff",
                p: 4,
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
                    className={IsRegisterUser ? "active active-styling" : ""}
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
                    className={!IsRegisterUser ? "active active-styling" : ""}
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
                  {IsRegisterUser ? (
                    <Login
                      handleChangeLogin={handleChangeLogin}
                      handleLoginUser={handleLoginUser}
                      loginData={loginData}
                    />
                  ) : (
                    <UserRegister
                      handleUserRegister={handleUserRegister}
                      userData={userData}
                      handleChange={handleChange}
                      IsRegisterUser={IsRegisterUser}
                      setRegisterUser={setRegisterUser}
                      error={Error}
                    />
                  )}
                </div>
              </div>
            </Box>
          </Modal>
          {employerdata ? (
            <>
              <MessageNotification employerdata={employerdata}/>
              <img
                src={getIndividualJobs.EmployerPhotoUrl}
                alt={employerdata.name}
                id="employer-image"
                style={{
                  borderRadius: "50%",
                  height: "55px",
                  width: "55px",
                  cursor: "pointer",
                  marginRight: "1rem",
                }}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/postjobform"
                >
                  Post job
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/managejob/${employerdata._id}`}
                >
                  Manage Job
                </MenuItem>
                <MenuItem onClick={handleLogoutEmployer}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div className="post-btn" id="post-btn">
              <NavLink to="/post" className="link">
                Employer
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
