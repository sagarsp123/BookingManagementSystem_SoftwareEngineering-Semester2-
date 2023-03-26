import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import "./login.css";
//Component imports
import InputFrame from "./components/InputFrame";
import Button from "./components/Button/Button";

import TextRedirect from "./components/TextRedirect";
import InputFramePass from "./components/InputFramePass";

import HomeButton from "./components/HomeButton";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function Login(props) {
  const navigate = useNavigate();

  const {
    email_val,
    email_func,
    password_val,
    password_func,
    logged_in_email_val,
    setlogged_in_email_func,
    logged_in_firebase_val,
    setlogged_in_firebase_func
  } = props;

  const uiConfig = {
    signInFlow: "popup", //redirect
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        console.log("authResult", authResult);
        //need to add code to POST token to api, receive JWT back
        //and add it to session and log in user

        //firebase.auth().currentUser.displayName
        try {
          setlogged_in_email_func(firebase.auth().currentUser.displayName);
          if (logged_in_email_val === "") {
            setlogged_in_email_func("Guest User");
          }
        } catch (e) {
          setlogged_in_email_func("Guest User");
          console.log("Error");
        }
        navigate("/");
        return false;
      }
    }
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setlogged_in_firebase_func(!!user);
        console.log("user", user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  // const [showTextSucess, setShowTextSuccess] = useState(false);
  // const [TextSucess, setTextSucess] = useState("Deafult");

  // useEffect(() => {
  //   let timeout;
  //   if (showTextSucess) {
  //     timeout = setTimeout(() => {
  //       setShowTextSuccess(false);
  //     }, 5000);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [showTextSucess]);

  function handleResponse(response) {
    if (response.ok) {
      return response.json().then((data) => handleSuccess(data));
    } else {
      return response.json().then((error) => handleFailure(error));
    }
  }

  function handleSuccess(data) {
    // Called when the API request is successful
    console.log("Success:", data);

    //need to save token in session

    // setIsAuthenticated(true);
    // setloggedinuser(data.email);

    // setShowTextSuccess(true);
    // setTextSucess(`Logged in as ${data.email}!`);

    // Call any other functions or update state as needed
    setlogged_in_email_func(email_val);
    navigate("/");
  }

  function handleFailure(error) {
    // Called when the API request fails
    console.error("Error:", error);

    // setShowTextSuccess(true);
    // setTextSucess("Login Failed");
    // Call any other functions or update state as needed
  }

  function handleClick_Logout() {
    setlogged_in_email_func("");
    if (logged_in_firebase_val) {
      firebase.auth().signOut();
    }
  }

  function handleClick_Login() {
    if (!email_val) {
      setEmailError("Email is required");
      console.log(emailError);
    } else if (!/\S+@\S+\.\S+/.test(email_val)) {
      setEmailError("Invalid email format");
      console.log(emailError);
    } else if (!password_val) {
      setpasswordError("Please enter a password");
      console.log(passwordError);
    } else {
      setEmailError("");
      setpasswordError("");

      fetch("http://3.144.222.168:3000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email_val,
          password: password_val
        })
      })
        .then((response) => handleResponse(response))
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }

  return (
    <div>
      <div className="help">
        <span className="nunito-semi-bold-green-20px">Help</span>
      </div>
      <div className="contact">
        <span className="nunito-semi-bold-green-20px">Contact us</span>
      </div>
      <div className="home-button">
        <HomeButton />
      </div>

      <div className="explorer_pic">
        <img src={require("./explorer.png")} width="960" height="848" alt="" />
      </div>

      <div className="left_spacing">
        <div className="welcome-back-traveler">
          <span className="poppins-extra-bold-green-36px">
            WELCOME BACK TRAVELER!
          </span>
        </div>

        <p>
          <span className="nunito-normal-biscay-24px">
            Don’t have a account,
          </span>
          <span className="nunito-normal-biscay-24px">&nbsp;</span>
          <TextRedirect
            text="Sign Up"
            location="/signup"
            classname="nunito-bold-biscay-24px"
          />
        </p>

        <div className="email">
          <span className="nunito-semi-bold-biscay-28px">Email</span>
        </div>

        <InputFrame placeholder="test@gmail.com" parent_function={email_func} />

        <div className="password">
          <span className="nunito-semi-bold-biscay-28px">Password</span>
        </div>

        <InputFramePass
          placeholder="Enter your password"
          parent_function={password_func}
        />
        <div>
          <p className="forgot_password">
            <span>
              <TextRedirect
                text="Forgot password?"
                location="/reset-password-email"
                classname="nunito-semi-bold-biscay-20px"
              />
            </span>
          </p>

          <div>
            {logged_in_email_val ? (
              <div className="button_login">
                <Button clickHandler={handleClick_Logout} text="Logout" />
              </div>
            ) : (
              <div>
                <div className="button_login">
                  <Button clickHandler={handleClick_Login} text="Login" />
                </div>
                <div className="line">
                  <img
                    src={require("./line.png")}
                    width="448"
                    height="30"
                    alt=""
                  />{" "}
                </div>
                <div className="firebase_auth">
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
