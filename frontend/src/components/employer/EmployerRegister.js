import React from 'react'
import { Navigate } from 'react-router-dom';
import EmployerLogin from './EmployerLogin';

const EmployerRegister = ({ handleRegisterEmployer, handleChange ,employerRegisterData}) => {

  return (
    <>
      <div className="form-container">
        <form action="" className="form" onSubmit={handleRegisterEmployer}>
          <input
            type="text"
            name="name"
            value={employerRegisterData.name}
            onChange={handleChange}
            placeholder="Enter your name "
            style={{
              width: "400px",
              margin: "10px 0",
              height: "35px",
              border: "2px solid #e9ebee",
            }}
          />
          <input
            type="email"
            name="email"
            value={employerRegisterData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              width: "400px",
              margin: "10px 0",
              height: "35px",
              border: "2px solid #e9ebee",
            }}
          />
          <input
            type="password"
            name="password"
            value={employerRegisterData.password}
            onChange={handleChange}
            placeholder="Password"
            style={{
              width: "400px",
              margin: "10px 0",
              height: "35px",
              border: "2px solid #e9ebee",
            }}
          />
          <input
            type="number"
            name="mobileNumber"
            value={employerRegisterData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your Mobile Number"
            style={{
              width: "400px",
              margin: "10px 0",
              height: "35px",
              border: "2px solid #e9ebee",
            }}
          />
          <input
            type="text"
            name="Address"
            value={employerRegisterData.Address}
            onChange={handleChange}
            placeholder="Enter your address"
            style={{
              width: "400px",
              margin: "10px 0",
              height: "35px",
              border: "2px solid #e9ebee",
            }}
          />
          <button
            type="submit"
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
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default EmployerRegister
