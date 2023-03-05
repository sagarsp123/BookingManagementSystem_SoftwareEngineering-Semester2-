import React from "react";
import "./SocialLogin.css";

function SocialLogin(props) {
  const { frame14, iconFacebook, className } = props;

  function handleClick_Goog() {
    console.log("Login with Google");
  }

  function handleClick_Face() {
    console.log("Login with Facebook");
  }

  return (
    <div className={`social-login ${className || ""}`}>
      <img
        className="frame-1"
        src={frame14}
        onClick={handleClick_Goog}
        style={{ cursor: "pointer" }}
      />
      <div className="frame-15">
        <img
          className="icon-facebook"
          src={iconFacebook}
          alt="icon-facebook"
          onClick={handleClick_Face}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default SocialLogin;
