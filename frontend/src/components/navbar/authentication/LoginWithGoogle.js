import React from 'react'

const LoginWithGoogle = () => {
  return (
    <>
      <div className="google-item">
        <div className="google-image">
          <img
            src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
            alt="Google sign-in"
            style={{ width: "100%", height: "41px" }}
          />
        </div>
        <p
          style={{
            width: "250px",
            background: "#f5f5f5",
            height: "41px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={""}
        >
          Sign in with Google
        </p>
      </div>
    </>
  );
}

export default LoginWithGoogle
