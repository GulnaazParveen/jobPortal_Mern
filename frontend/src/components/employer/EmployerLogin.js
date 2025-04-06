import React from 'react'
const EmployerLogin = ({handleLoginEmployer,handleChangeLogin,loginData}) => {
  return (
    <>
      <div className="google-sign-container">
        <form onSubmit={handleLoginEmployer} className="form">
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
              border: "2px solid #e9ebee",
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
              border: "2px solid #e9ebee",
            }}
          />
          <button
            type="submit"
            name="submit"
            style={{
              fontSize: "1.3rem",
              width: "400px",
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
    </>
  );
}

export default EmployerLogin
