import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import "./home.css";

import TextRedirect from "./components/TextRedirect";
import Button from "./components/Button/Button";

function Home(props) {
  const {
    email_val,
    email_func,
    password_val,
    password_func,
    logged_in_email_val,
    setlogged_in_email_func
  } = props;

  return (
    <div>
      <div className="already_have">
        <span className="already_have_text opensans-normal-biscay-24px">
          {"Dummy Homepage"}
        </span>
      </div>
      {logged_in_email_val ? (
        <p className="already_have_text opensans-normal-biscay-24px">
          {`Logged in as ${logged_in_email_val}`}
        </p>
      ) : (
        <p className="already_have_text opensans-normal-biscay-24px">
          Not logged in
        </p>
      )}

      <p>
        <TextRedirect
          text="Login"
          location="/login"
          classname="nunito-bold-biscay-24px"
        />
      </p>
      <p>
        <TextRedirect
          text="Sign Up"
          location="/signup"
          classname="nunito-bold-biscay-24px"
        />
      </p>
    </div>
  );
}

export default Home;
