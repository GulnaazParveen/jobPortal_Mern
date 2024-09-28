
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./navbar.css";
import { Divider, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-responsive-modal/styles.css";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
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

const Navbar = () => {
  const [ismodelopen, setModelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const user = useSelector((state) => state.auth.user);
  const employer = useSelector((state) => state.employer.employer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error} = useSelector((state) => state.auth); // Access auth state
 
  


  // register user logic
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [IsRegisterUser, setRegisterUser] = useState(false);
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
    formData.append("userName", userData.userName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/registerUser",
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
  const [isLoginUser, setLoginUser] = useState(false);
  // const [user, setDataAfterLogin] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    setLoginData({
      ...loginData, // Spread the previous state to keep other values
      [e.target.name]: e.target.value, // Update the specific field
    });
  };
  // Handle login user logic
  const handleLoginUser = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData)); // Dispatch login action
    loading(true)
  };
  // Monitor `user` state change after login
  useEffect(() => {
    if (user) {
      console.log("Login successful, user data:", user); // Confirm user data
      navigate("/");
    }
  }, [user, navigate]); // useEffect runs when `user` or `navigate` changes

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  

  

  // handle user signIn
  const handleUserSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      console.error("Error signing in: ", error);
      dispatch(clearUser());
    }
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
        .get(`http://localhost:8000/api/employer/${employerId}`)
        .then((response) => {
          console.log(response.data); // Log the response to check the data structure
          setJobsBasedEmployerId(response.data);
        })
        .catch((error) => console.error("Error fetching job data:", error));
    }
  }, [employerId]);

const handleLogoutEmployer=()=>{
  dispatch(logoutEmployer())
}
  // custom fetching data from form
    const employerdata = useSelector((state) => state.employer.employer);

    useEffect(() => {
       console.log("Employer data:", employerdata);
      if (employerdata) {
        navigate("/");
      }
    }, [employerdata,navigate]);


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
                to="/pages"
                style={({ isActive }) => {
                  return { color: isActive ? "#00D363" : "" };
                }}
                className="link"
              >
                Pages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                style={({ isActive }) => {
                  return { color: isActive ? "#00D363" : "" };
                }}
                className="link"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                style={({ isActive }) => {
                  return { color: isActive ? "#00D363" : "" };
                }}
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
                width: 600,
                height: 400,
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
              {IsRegisterUser ? (
                <Login
                  handleChangeLogin={handleChangeLogin}
                  handleLoginUser={handleLoginUser}
                  loginData={loginData}
                  isLoginUser={isLoginUser}
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
            </Box>
          </Modal>
          {employerdata ? (
            <>
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
