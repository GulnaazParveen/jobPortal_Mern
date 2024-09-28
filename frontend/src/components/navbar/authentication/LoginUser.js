import React from 'react'
import LoginWithGoogle from './LoginWithGoogle';


const Login = ({ handleChangeLogin, handleLoginUser, loginData ,isLoginUser}) => {
  return (
    <>
      <div className="google-sign-container">
        <p
          style={{
            fontSize: "1.3rem",
            fontWeight: "800",
            fontFamily: " Montserrat, sans-serif",
          }}
        >
          Login
        </p>
        <form onSubmit={handleLoginUser} className="form">
          <input
            type="email"
            name='email'
            value={loginData.email}
            onChange={handleChangeLogin}
            placeholder="Email"
            style={{
              width: "300px",
              margin: "10px 0",
              height: "35px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChangeLogin}
            style={{
              width: "300px",
              margin: "10px 0",
              height: "35px",
            }}
          />
          <button
            type="submit"
            onClick={handleLoginUser}
            style={{
              width: "300px",
              margin: "10px 0",
              height: "40px",
              backgroundColor: "#00D363",
              fontWeight: "700",
              fontSize: "1.2rem",
              color: " #ffffff",
            }}
          >
            Login
          </button>
        </form>
      </div>
      {isLoginUser && <p style={{ color: "red" }}>{isLoginUser}</p>}
      <div className="form-bottom">
        <p style={{ textTransform: "capitalize", fontSize: "1.1rem" }}>
          New User ?
        </p>
        <a href="" style={{ textDecoration: "none" }}>
          Signup Now
        </a>
      </div>
      <LoginWithGoogle />
    </>
  );
};

export default Login
