import "./App.css";
import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Username from "./components/Username";
import Password from "./components/Password";
import SocialLogin from "./components/SocialLogin";
import BtnPrimary from "./components/BtnPrimary";
import Image from "./components/Image";
import SignupPage from "./components/SignupPage";

import SignUpRedirectButton from "./components/Button_Sign_Up";

import Mockhomepage from "./components/Mockhomepage";

import Signuptext from "./components/Signuptext";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedinuser, setloggedinuser] = useState("None");

  const [password, setpassword] = useState("66666");
  const [email, setemail] = useState("test@gmail.com");

  const [showTextSucess, setShowTextSuccess] = useState(false);

  const [TextSucess, setTextSucess] = useState("Deafult");

  useEffect(() => {
    let timeout;
    if (showTextSucess) {
      timeout = setTimeout(() => {
        setShowTextSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showTextSucess]);

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

    setIsAuthenticated(true);
    setloggedinuser(data.email);

    setShowTextSuccess(true);
    setTextSucess(`Logged in as ${data.email}!`);

    // Call any other functions or update state as needed
  }

  function handleFailure(error) {
    // Called when the API request fails
    console.error("Error:", error);

    setShowTextSuccess(true);
    setTextSucess("Login Failed");
    // Call any other functions or update state as needed
  }

  function handleClick_Login() {
    fetch("http://18.189.189.83:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => handleResponse(response))
      .catch((error) => console.error(error));
  }

  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <div className="container-center-horizontal">
            <div className="login-page screen">
              <div className="overlap-group2-1">
                <div className="login-1">
                  <div className="welcome-back-traveler poppins-extra-bold-green-36px">
                    <span className="poppins-extra-bold-green-36px">
                      WELCOME BACK TRAVELER!
                    </span>
                  </div>
                  <p className="dont-have-a-account-sign-upopensans-normal-biscay-24px">
                    <span className="nunito-normal-biscay-24px">
                      Don’t have a account,
                    </span>
                    <span className="nunito-normal-biscay-24px">&nbsp;</span>
                    <SignUpRedirectButton
                      children="Sign Up"
                      location="/signup-page"
                    />
                  </p>
                  <div className="input-field-1">
                    <Username
                      spanText1="Email or Mobile Number (###)-###-####"
                      spanText2="test@gmail.com"
                      parent_function={setemail}
                    />
                    <Password
                      spanText="Password"
                      iconFontAwesomeFreeSolidEEyeSlash="/img/icon-font-awesome-free-solid-e-eye-slash-1@2x.png"
                      parent_function={setpassword}
                    />

                    <div className="forget-password nunito-semi-bold-biscay-20px">
                      <span className="nunito-semi-bold-biscay-20px">
                        Forgot password?
                      </span>
                    </div>
                  </div>
                  <div className="overlap-group-2">
                    <img
                      className="vector-1-2"
                      src="/img/vector-1-1@2x.png"
                      alt="Vector 1"
                    />
                    <div className="frame-13-1">
                      <div className="or-continue-with-1 nunito-normal-biscay-20px">
                        <span className="nunito-normal-biscay-20px">
                          or continue with
                        </span>
                      </div>
                    </div>
                  </div>
                  <SocialLogin
                    frame14="/img/frame-14-1@2x.png"
                    iconFacebook="/img/icon-font-awesome-free-brands-f-facebook-1@2x.png"
                    frame16="/img/frame-16-1@2x.png"
                  />
                  <div className="span nunito-semi-bold-biscay-28px">
                    {showTextSucess && (
                      <Signuptext text={TextSucess} className="Loginfailtext" />
                    )}
                  </div>
                </div>

                <BtnPrimary children="Login" clickHandler={handleClick_Login} />
              </div>
              <div className="flex-col-1">
                <div className="flex-row">
                  <div className="menu-1 nunito-semi-bold-green-20px">
                    <div className="help-1">
                      <span className="nunito-semi-bold-green-20px">Help</span>
                    </div>
                    <div className="contact-us-1">
                      <span className="nunito-semi-bold-green-20px">
                        Contact us
                      </span>
                    </div>
                  </div>
                  <img
                    className="icon-home-1"
                    src="/img/icon-font-awesome-free-solid-h-home-1@2x.png"
                    alt="icon-home"
                  />
                </div>
                <div className="overlap-group3">
                  <Image
                    image="/img/exlorer-illustration-1-1@2x.png"
                    birdLogo2="/img/bird-logo-2-1@2x.png"
                    birdLogo3="/img/bird-logo-3-1@2x.png"
                    birdLogo4="/img/bird-logo-4-1@2x.png"
                  />
                  <div className="overlap-group1-1">
                    <img className="o2-1" src="/img/o2-1@2x.png" alt="o2" />
                    <img className="o1-1" src="/img/o1-1@2x.png" alt="o1" />
                    <h1 className="b-k-easy-1 poppins-medium-biscay-64px">
                      <span className="poppins-medium-green-64px">
                        B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k
                      </span>
                      <span className="poppins-medium-biscay-64px">Easy</span>
                    </h1>
                    <img
                      className="vector-2"
                      src="/img/vector-2@2x.png"
                      alt="Vector"
                    />
                    <img
                      className="vector-3"
                      src="/img/vector-3@2x.png"
                      alt="Vector"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route path="/signup-page">
          <SignupPage {...signupPageData} />
        </Route>
        <Route path="/mockhomepage">
          <Mockhomepage
            isauth={isAuthenticated}
            loggedinuser={loggedinuser}
            isauthf={setIsAuthenticated}
            loggedinuserf={setloggedinuser}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const image1Data = {
  image: "/img/exlorer-illustration-1-1@2x.png",
  birdLogo2: "/img/bird-logo-2-1@2x.png",
  birdLogo3: "/img/bird-logo-3-1@2x.png",
  birdLogo4: "/img/bird-logo-4-1@2x.png",
};

const btnPrimary1Data = {
  children: "Sign up",
  className: "btn_primary-1",
};

const socialLogin1Data = {
  frame14: "/img/frame-14-1@2x.png",
  iconFacebook: "/img/icon-font-awesome-free-brands-f-facebook-1@2x.png",
  frame16: "/img/frame-16-1@2x.png",
  className: "social-login-1",
};

const username1Data = {
  spanText1: "Mobile Number",
  spanText2: "##########",
  className: "username-1",
};

const homepage_data = {
  spanText1: "Username",
};

const username2Data = {
  spanText1: "Email",
  spanText2: "makwanashyam6@gmail.com",
  className: "username-3",
};

const password1Data = {
  spanText: "Password",
  iconFontAwesomeFreeSolidEEyeSlash:
    "/img/icon-font-awesome-free-solid-e-eye-slash-1@2x.png",
  className: "password-2",
};

const btnPrimary1Datalogin = {
  children: "Login",
  className: "btn_primary-1",
};

const signupre = {
  children: "Sign Up",
  location: "/signup-page",
};

const signupPageData = {
  spanText1: "Help",
  spanText2: "Contact us",
  o2: "/img/o2-1@2x.png",
  o1: "/img/o1-1@2x.png",
  spanText3: "B      k",
  spanText4: "Easy",
  vector2: "/img/vector-3@2x.png",
  spanText5: "Already have an account? ",
  spanText6: "Login",
  vector1: "/img/vector-1-1@2x.png",
  spanText7: "or continue with",
  spanText8: "First Name",
  spanText9: "Shyam",
  spanText10: "Last Name",
  spanText11: "Makwana",
  iconHome: "/img/icon-font-awesome-free-solid-h-home-1@2x.png",
  username1Props: image1Data,
  btnPrimaryProps: btnPrimary1Data,
  socialLoginProps: socialLogin1Data,
  username1Props2: username1Data,
  username2Props: username2Data,
  passwordProps: password1Data,
};
