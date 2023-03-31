import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import "./style.css";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [otpform, setotpform] = useState("false");
  const [password, setpassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setotp] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/signup", {
      email: email,
    });
    if (res.data === "otpsent") {
      setotpform("true");
    }
  };
  const handleoptsubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/otp", {
      name: name,
      password: password,
      email: email,
      mobile: mobile,
      otp: otp,
    });
    if (response.data === "success") {
      window.location.href = "/";
    } else {
      console.log("no");
    }
  };
  return (
    <>
      {otpform === "false" && (
        <div className="login">
          <div className="login_leftbar">
            <img className="login_leftbar_img" src="/images/okay.png" />
          </div>
          <div className="login_rightbar">
            <form className="login_signup_form">
              <h1 className="login_rightbar_h1">Let's Orgnize Task</h1>
              <div className="login_form_top_div">
                <label className="login_signup_label">Name</label>
                <input
                  className="login_signup_input"
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                ></input>
              </div>
              <div className="login_form_top_div">
                <label className="login_signup_label">Email</label>
                <input
                  className="login_signup_input"
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                ></input>
              </div>
              <div className="login_form_bottom_div">
                <label className="login_signup_label">Password</label>
                <input
                  className="login_signup_input"
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                ></input>
              </div>
              <div className="login_form_top_div">
                <label className="login_signup_label">Mobile no</label>
                <input
                  className="login_signup_input"
                  type="number"
                  placeholder="Enter Your Mobile no"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                ></input>
              </div>

              <button className="login_signup_button" onClick={handlesubmit}>
                Submit
              </button>
              <div>
                <br />
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {otpform === "true" && (
        <>
          <form>
            <label className="login_signup_label">Enter your otp</label>
            <input
              className="login_signup_input"
              type="number"
              onChange={(e) => setotp(e.target.value)}
            />
            <button className="login_signup_button" onClick={handleoptsubmit}>
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Signup;
