import React, { useState, useEffect } from "react";
import Image from "../Image";
import BtnPrimary from "../BtnPrimary";
import SocialLogin from "../SocialLogin";
import Username from "../Username";
import Password from "../Password";
import "./SignupPage.css";

import SignUpRedirectButton from "../Button_Sign_Up";

import Signuptext from "../Signuptext";

function SignupPage(props) {
  const {
    spanText1,
    spanText2,
    o2,
    o1,
    spanText3,
    spanText4,
    vector2,
    spanText5,
    spanText6,
    vector1,
    spanText7,
    spanText8,
    spanText9,
    spanText10,
    spanText11,
    iconHome,
    username1Props,
    btnPrimaryProps,
    socialLoginProps,
    username1Props2,
    username2Props,
    passwordProps,
  } = props;

  const [mobile_num, setmobile_num] = useState("");
  const [email, setemail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [password, setpassword] = useState("");

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

    setShowTextSuccess(true);
    setTextSucess("Sign Up Success");

    // Call any other functions or update state as needed
  }

  function handleFailure(error) {
    // Called when the API request fails
    console.error("Error:", error);

    setShowTextSuccess(true);
    setTextSucess("Sign Up Failed");
    // Call any other functions or update state as needed
  }

  function handleClick_Submit() {
    console.log("submit test");
    fetch("http://18.189.189.83:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        phone_number: mobile_num,
        first_name: first_name,
        last_name: last_name,
        password: password,
      }),
    })
      .then((response) => handleResponse(response))
      .catch((error) => console.error(error));
  }

  return (
    <div className="container-center-horizontal">
      <div className="signup-page screen">
        <div className="flex-col">
          <div className="menu nunito-semi-bold-green-20px">
            <div className="help">
              <span className="nunito-semi-bold-green-20px">{spanText1}</span>
            </div>
            <div className="contact-us">
              <span className="nunito-semi-bold-green-20px">{spanText2}</span>
            </div>
          </div>
          <div className="overlap-group-container">
            <div className="overlap-group2">
              <Image
                image={username1Props.image}
                birdLogo2={username1Props.birdLogo2}
                birdLogo3={username1Props.birdLogo3}
                birdLogo4={username1Props.birdLogo4}
              />
              <div className="overlap-group">
                <img className="o2" src={o2} alt="o2" />
                <img className="o1" src={o1} alt="o1" />
                <h1 className="b-k-easy poppins-medium-biscay-64px">
                  <span className="poppins-medium-green-64px">{spanText3}</span>
                  <span className="poppins-medium-biscay-64px">
                    {spanText4}
                  </span>
                </h1>
                <img
                  className="vector"
                  src="/img/vector-2@2x.png"
                  alt="Vector"
                />
                <img className="vector-1" src={vector2} alt="Vector" />
              </div>
            </div>
            <div className="overlap-group1">
              <div className="login">
                <span className="already-have-an-account-login opensans-normal-biscay-24px">
                  {spanText5}
                </span>

                <span className="login2">
                  <SignUpRedirectButton children="Login" location="/Login" />
                </span>

                {/* <div className="overlap-group-1">
                  <img className="vector-1-1" src={vector1} alt="Vector 1" />
                  <div className="frame-13">
                    <div className="or-continue-with nunito-normal-biscay-20px">
                      <span className="nunito-normal-biscay-20px">
                        {spanText7}
                      </span>
                    </div>
                  </div>
                </div>
                <SocialLogin
                  frame14={socialLoginProps.frame14}
                  iconFacebook={socialLoginProps.iconFacebook}
                  frame16={socialLoginProps.frame16}
                  className={socialLoginProps.className}
                /> */}
              </div>
              <div className="input-field">
                <Username
                  spanText1={username1Props2.spanText1}
                  spanText2={username1Props2.spanText2}
                  className={username1Props2.className}
                  parent_function={setmobile_num}
                  value={mobile_num}
                />
                <Username
                  spanText1={username2Props.spanText1}
                  spanText2={username2Props.spanText2}
                  className={username2Props.className}
                  parent_function={setemail}
                  value={email}
                />
                <Username
                  spanText1={spanText8}
                  spanText2={spanText9}
                  className={username2Props.className}
                  parent_function={setfirst_name}
                  value={first_name}
                />
                <Username
                  spanText1={spanText10}
                  spanText2={spanText11}
                  className={username2Props.className}
                  parent_function={setlast_name}
                  value={last_name}
                />
                {/* <div className="group-1000001540">
                  <div className="username-4">
                    <div className="st-name nunito-semi-bold-biscay-28px">
                      <span className="nunito-semi-bold-biscay-28px">
                        {spanText8}
                      </span>
                    </div>
                    <div className="frame-4-4">
                      <div className="shyam-1 nunito-normal-tropical-blue-24px">
                        <span className="nunito-normal-tropical-blue-24px">
                          {spanText9}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="username-5">
                    <div className="st-name nunito-semi-bold-biscay-28px">
                      <span className="nunito-semi-bold-biscay-28px">
                        {spanText10}
                      </span>
                    </div>
                    <div className="frame-4-5">
                      <div className="makwana nunito-normal-tropical-blue-24px">
                        <span className="nunito-normal-tropical-blue-24px">
                          {spanText11}
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
                <Password
                  spanText={passwordProps.spanText}
                  parent_function={setpassword}
                  value={password}
                />
                <BtnPrimary
                  className="btn_primary-1"
                  children={btnPrimaryProps.children}
                  clickHandler={handleClick_Submit}
                />

                <div className="span nunito-semi-bold-biscay-28px">
                  {showTextSucess && (
                    <Signuptext text={TextSucess} className="signuptext" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="icon-home" src={iconHome} alt="icon-home" />
      </div>
    </div>
  );
}

export default SignupPage;
