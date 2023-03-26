import React, { useState, useEffect } from "react";

import "./signup.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import HomeButton from "./components/HomeButton";

import TextRedirect from "./components/TextRedirect";
import InputFrame from "./components/InputFrame";
import InputFramePass from "./components/InputFramePass";
import Button from "./components/Button/Button";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function Signup(props) {
  const navigate = useNavigate();

  const {
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

        //firebase.auth().currentUser.displayName wont work for phones

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

  const [mobile_num_val, setmobile_num] = useState("");
  const [email_val, setemail] = useState("");
  const [first_name_val, setfirst_name] = useState("");
  const [last_name_val, setlast_name] = useState("");
  const [password_val, setpassword] = useState("");

  const [input_error, setinput_error] = useState("");

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

  function isAllDigits(str) {
    // Use a regular expression to check if the string contains only digits
    return /^\d+$/.test(str);
  }

  function isTenDigits(str) {
    // check if the string contains 10 digits
    return str.length === 10;
  }

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

    // setShowTextSuccess(true);
    // setTextSucess("Sign Up Success");

    // Call any other functions or update state as needed

    navigate("/login");
  }

  function handleFailure(error) {
    // Called when the API request fails
    console.error("Error:", error);

    // setShowTextSuccess(true);
    // setTextSucess("Sign Up Failed");
    // Call any other functions or update state as needed
  }

  function handleClick_Submit() {
    if (!email_val) {
      setinput_error("Email is required");
      console.log(input_error);
    } else if (!/\S+@\S+\.\S+/.test(email_val)) {
      setinput_error("Invalid email format");
      console.log(input_error);
    } else if (!password_val) {
      setinput_error("Please enter a password");
      console.log(input_error);
    } else if (!first_name_val) {
      setinput_error("Please enter a first_name");
      console.log(input_error);
    } else if (!last_name_val) {
      setinput_error("Please enter a last_name");
      console.log(input_error);
    } else if (!mobile_num_val) {
      setinput_error("Please enter a phone number");
      console.log(input_error);
    } else if (!(isAllDigits(mobile_num_val) && isTenDigits(mobile_num_val))) {
      setinput_error("Mobile number must be in format ##########");
      console.log(input_error);
    } else {
      setinput_error("");

      setmobile_num("");
      setemail("");
      setfirst_name("");
      setlast_name("");
      setpassword("");

      fetch("http://3.144.222.168:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email_val,
          phone_number: mobile_num_val,
          first_name: first_name_val,
          last_name: last_name_val,
          password: password_val
        })
      })
        .then((response) => handleResponse(response))
        .catch((error) => console.error(error));
    }
  }

  return (
    <div>
      <div className="help_r">
        <span className="nunito-semi-bold-green-20px">Help</span>
      </div>
      <div className="contact_r">
        <span className="nunito-semi-bold-green-20px">Contact us</span>
      </div>
      <div className="home-button_r">
        <HomeButton />
      </div>

      <div className="explorer_pic_left">
        <img src={require("./explorer.png")} width="960" height="848" alt="" />
      </div>

      <div className="right_spacing">
        <div className="already_have">
          <span className="already_have_text opensans-normal-biscay-24px">
            {"Already have an account? "}
          </span>

          <span>
            <TextRedirect
              text="Login"
              location="/login"
              classname="nunito-bold-biscay-24px"
            />
          </span>
        </div>

        <div>
          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">
                Mobile Number
              </span>
            </div>

            <InputFrame
              placeholder="##########"
              parent_function={setmobile_num}
            />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">Email</span>
            </div>
            <InputFrame
              placeholder="test@gmail.com"
              parent_function={setemail}
            />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">First Name</span>
            </div>
            <InputFrame placeholder="Bob" parent_function={setfirst_name} />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">Last Name</span>
            </div>
            <InputFrame placeholder="Smith" parent_function={setlast_name} />
          </div>

          <div className="text_header_r">
            <div>
              <span className="nunito-semi-bold-biscay-28px">Password</span>
            </div>

            <InputFramePass
              placeholder="Enter your password"
              parent_function={setpassword}
            />
          </div>
        </div>

        <div className="button_header">
          <div>
            <Button clickHandler={handleClick_Submit} text="Sign Up" />
          </div>
        </div>

        {logged_in_email_val ? (
          <div></div>
        ) : (
          <div>
            <div className="line_r">
              <img src={require("./line.png")} width="448" height="30" alt="" />{" "}
            </div>
            <div className="firebase_auth_r">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
