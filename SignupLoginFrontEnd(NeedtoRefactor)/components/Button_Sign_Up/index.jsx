import React from "react";
import { useHistory } from "react-router-dom";

function SignUpRedirectButton(props) {
  const { children, location } = props;
  const history = useHistory();

  function handleClick() {
    history.push(location);
  }

  return (
    <span
      className="nunito-bold-biscay-24px"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {children}
    </span>
  );
}

export default SignUpRedirectButton;
