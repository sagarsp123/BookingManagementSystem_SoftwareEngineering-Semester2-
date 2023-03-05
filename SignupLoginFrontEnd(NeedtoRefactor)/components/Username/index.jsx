import React, { useState } from "react";
import "./Username.css";

function Username(props) {
  return (
    <div className="username">
      <div className="email nunito-semi-bold-biscay-28px">
        <span className="span nunito-semi-bold-biscay-28px">
          {props.spanText1}
        </span>
      </div>
      <div className="frame-4-1">
        <div className="makwanashyam6gmailcom nunito-normal-tropical-blue-24px">
          <input
            className="span nunito-normal-tropical-blue-24px"
            id="username-input"
            type="text"
            placeholder={props.spanText2}
            value={props.value}
            onChange={(event) => props.parent_function(event.target.value)}
            style={{
              border: "2px solid gray",
              borderRadius: "5px",
              padding: "10px",
              width: "620px",
              fullWidth: true,
              outline: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Username;
