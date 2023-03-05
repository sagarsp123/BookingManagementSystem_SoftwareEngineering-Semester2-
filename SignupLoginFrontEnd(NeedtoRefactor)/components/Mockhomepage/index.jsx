import React, { useState } from "react";

import "./Mockhomepage.css";

function Mockhomepage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  function handleLogin() {
    setUsername("Jane");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    props.loggedinuserf("");
    props.isauthf(false);
  }

  return (
    <div className="container-center-horizontal">
      <div className="signup-page screen">
        <div className="flex-col">
          <div className="menu nunito-semi-bold-green-20px">
            {props.isauth ? (
              <p>
                Logged in as {props.loggedinuser}.{" "}
                <button onClick={handleLogout}>Logout</button>
              </p>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mockhomepage;
