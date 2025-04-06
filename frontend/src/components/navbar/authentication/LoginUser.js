import React from 'react'
import { useSelector } from 'react-redux';
const Login = ({ handleChangeLogin, handleLoginUser, loginData}) => {

const {error}=useSelector((state)=>state.auth)  
  return (
    <>
      <div className="google-sign-container">
        <form onSubmit={handleLoginUser} className="form">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChangeLogin}
            placeholder="Email"
            style={{
              width: "400px",
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
              width: "400px",
              margin: "10px 0",
              height: "35px",
            }}
          />
          <button
            type="submit"
            onClick={handleLoginUser}
            style={{
              width: "400px",
              margin: "10px 0",
              height: "35px",
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
      {error && (
        <p style={{ color: "red", textAlign: "center", fontWeight: "600" }}>
          {error}
        </p>
      )}
    </>
  );
};

export default Login
