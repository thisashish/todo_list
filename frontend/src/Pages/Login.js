import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { GoogleLogin } from "@react-oauth/google";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  useEffect(() => {
    const userauth = async () => {
      const res = await axios.get("/authenticate", {
        withCredentials: true,
        headers: {
          Accept: "application.json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      if (res.data === "error") {
        // window.location.href = '/login';
      } else {
        if (res.data.isAdmin === true) {
          window.location.href = "/adminpanel";
        } else {
          window.location.href = "/";
        }
      }
    };
    userauth();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "/login",
      {
        password: password,
        email: email,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      if (res.data.isAdmin === true) {
        window.location.href = "/adminpanel";
      } else {
        window.location.href = "/";
      }
    } else {
      console.log("error");
    }
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div className="login">
      <div className="login_leftbar">
        <img className="login_leftbar_img" src="/images/okay.png" />
      </div>
      <div className="login_rightbar">
        <form className="login_signup_form">
          <h1 className="login_rightbar_h1">Let's Orgnize Task</h1>
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

          <button className="login_signup_button" onClick={handlesubmit}>
            Submit
          </button>
          <div>
            <br/>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
