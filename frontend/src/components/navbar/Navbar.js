
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
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
import { setEmployer,clearEmployer } from "../../features/EmployerSlice";
const Navbar = () => {
  const [ismodelopen, setModelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const employer=useSelector((state)=> state.employer.employer)
  const dispatch = useDispatch();

  // Dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle logout user
    const hanleLogout=()=>{
      dispatch(clearUser(user.id))
    }


    // handle logout employer
   const hanleEmployerLogout=()=>{
    dispatch(clearEmployer())
   }

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
                  src={user.photoURL}
                  alt={user.displayName}
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
                  <MenuItem onClick={hanleEmployerLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <p
                className="link"
                onClick={() => {
                  setModelOpen(true);
                }}
              >
                Login
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
              <div className="google-sign-container">
                <div className="google-item">
                  <div className="google-image">
                    <img
                      src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
                      alt="Google sign-in"
                      style={{ width: "100%", height: "50px" }}
                    />
                  </div>
                  <p
                    style={{
                      width: "250px",
                      background: "#f5f5f5",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={handleUserSignIn}
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
          {employer ? (
            <>
              <img
                src={employer.photoURL}
                alt={employer.displayName}
                id="employer-image"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                style={{
                  borderRadius: "50%",
                  height: "55px",
                  width: "55px",
                  cursor: "pointer",
                marginRight:"1rem"
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
                <MenuItem onClick={hanleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div className="post-btn" id="post-btn">
              <NavLink to="/post" className="link">
                Post a Job
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
