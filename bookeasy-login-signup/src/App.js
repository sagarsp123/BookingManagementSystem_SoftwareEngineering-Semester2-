import "./styles.css";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

import ForgotPassEmail from "./ForgotPassEmail";
import ForgotPassUpdate from "./ForgotPassUpdate";

function App() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const [logged_in_email, setlogged_in_email] = useState(
    sessionStorage.getItem("loggedIn") || ""
  );
  const [logged_in_firebase, setlogged_in_firebase] = useState(
    sessionStorage.getItem("loggedInFirebase") || false
  );

  useEffect(() => {
    sessionStorage.setItem("loggedIn", logged_in_email);
  }, [logged_in_email]);

  useEffect(() => {
    sessionStorage.setItem("loggedInFirebase", logged_in_firebase);
  }, [logged_in_firebase]);

  firebase.initializeApp({
    apiKey: "AIzaSyCt0PHGmSISchE63fvSWEFosGNHmOo5hz8",
    authDomain: "bookeasy-firebase-auth.firebaseapp.com",
    projectId: "bookeasy-firebase-auth",
    storageBucket: "bookeasy-firebase-auth.appspot.com",
    messagingSenderId: "540829392687",
    appId: "1:540829392687:web:322238f62133f4035acbda",
    measurementId: "G-QYBQCFT1TT"
  });

  const homePageData = {
    email_val: email,
    email_func: setemail,
    password_val: password,
    password_func: setpassword,
    logged_in_email_val: logged_in_email,
    setlogged_in_email_func: setlogged_in_email
  };

  const loginPageData = {
    email_val: email,
    email_func: setemail,
    password_val: password,
    password_func: setpassword,
    logged_in_email_val: logged_in_email,
    setlogged_in_email_func: setlogged_in_email,
    logged_in_firebase_val: logged_in_firebase,
    setlogged_in_firebase_func: setlogged_in_firebase
  };

  const siginupPageData = {
    logged_in_email_val: logged_in_email,
    setlogged_in_email_func: setlogged_in_email,
    logged_in_firebase_val: logged_in_firebase,
    setlogged_in_firebase_func: setlogged_in_firebase
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home {...homePageData} />} />
          <Route path="/login" element={<Login {...loginPageData} />} />
          <Route path="/signup" element={<Signup {...siginupPageData} />} />
          <Route path="/reset-password-email" element={<ForgotPassEmail />} />
          <Route
            path="/reset-password/:reset_token"
            element={<ForgotPassUpdate />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
