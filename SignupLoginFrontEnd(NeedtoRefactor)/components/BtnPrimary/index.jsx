import React from "react";
import "./BtnPrimary.css";

function BtnPrimary(props) {
  return (
    <div className={`btn_primary ${props.className || ""}`}>
      <div className="continue-to-book poppins-medium-white-18px">
        <span
          className="poppins-medium-white-18px"
          onClick={props.clickHandler}
          style={{ cursor: "pointer" }}
        >
          {props.children}
        </span>
      </div>
    </div>
  );
}

export default BtnPrimary;
