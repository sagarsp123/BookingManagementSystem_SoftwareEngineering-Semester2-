import React, { useState } from "react";
import "./Password.css";

function Password(props) {
  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordChange(event) {
    props.parent_function(event.target.value);
  }

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="password">
      <div className="password-1 nunito-semi-bold-biscay-28px">
        <span className="spanip3fc nunito-semi-bold-biscay-28px">
          {props.spanText}
        </span>
      </div>
      <div className="frame-4-2">
        <div className="frame-7" style={{ display: "flex" }}>
          <input
            className="span nunito-normal-tropical-blue-24px"
            id="password-input"
            type={showPassword ? "text" : "password"}
            placeholder={"Enter your password"}
            value={props.value}
            onChange={handlePasswordChange}
            style={{
              border: "2px solid gray",
              borderRadius: "5px",
              padding: "10px",
              width: "620px",
              fullWidth: true,
              outline: "none",
            }}
          />

          <span
            className="icon-font-awesome-free-solideeye-slash"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <i class="fa-solid fa-eye fa-xl"></i>
            ) : (
              <i class="fa-solid fa-eye-slash fa-xl"></i>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Password;
