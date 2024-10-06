import React from 'react'

const UserRegister = ({
  handleUserRegister,
  userData,
  handleChange,
  IsRegisterUser,
  setRegisterUser,
  error,
}) => {
  return (
    <>
      <div className="google-sign-container">
        <div className="form-container">
          <form onSubmit={handleUserRegister} className="form">
            <input
              type="text"
              name="userName"
              placeholder="Full Name..."
              value={userData.userName}
              onChange={handleChange}
              style={{
                width: "400px",
                margin: "10px 0",
                height: "35px",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={userData.email}
              onChange={handleChange}
              style={{
                width: "400px",
                margin: "10px 0",
                height: "35px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              style={{
                width: "400px",
                margin: "10px 0",
                height: "35px",
              }}
            />
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              style={{
                width: "400px",
                margin: "10px 0",
                height: "35px",
              }}
            />
            <button
              type="submit"
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
              Signup
            </button>
          </form>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default UserRegister
