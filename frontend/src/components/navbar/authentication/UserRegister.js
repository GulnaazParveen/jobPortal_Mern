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
        <p style={{ fontSize: "1.3rem", fontWeight: "600" }}>Signup</p>
        <div className="form-container">
          <form onSubmit={handleUserRegister} className="form">
            <input
              type="text"
              name="userName"
              placeholder="Full Name..."
              value={userData.userName}
              onChange={handleChange}
              style={{
                width: "300px",
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
                width: "300px",
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
                width: "100%",
                margin: "10px 0",
                height: "35px",
              }}
            />
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              style={{
                width: "300px",
                margin: "10px 0",
                height: "35px",
              }}
            />
            <button
              type="submit"
              style={{
                width: "300px",
                margin: "10px 0",
                height: "35px",
              }}
            >
              Signup
            </button>
          </form>
        </div>
        <div className="form-bottom">
          {IsRegisterUser ? (
            <p>
              New User?{" "}
              <button onClick={() => setRegisterUser(false)}>Signup</button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button onClick={() => setRegisterUser(true)}>Login</button>
            </p>
          )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default UserRegister
