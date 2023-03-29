import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./LogIn.css";
import openModal from "../../actions/openModal";
import axios from "axios";
import swal from "sweetalert";
import closeModal from "../../actions/closeModal";
import logInAction from "../../actions/logInAction";

export default function LogIn() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }

  async function submitLogIn(e) {
    e.preventDefault();
    const url = `${window.apiHost}/users/login`;
    console.log(url);
    console.log(email, password);
    const resp = await axios.post(url, { email, password });
    if (resp.data.msg === "badPass") {
      swal({
        title: "Password is incorrect, please check your password",
        icon: "error",
      });
    } else if (resp.data.msg === "noEmail") {
      swal({
        title:
          "The email address does not exists, please check or sign up with this email",
        icon: "error",
      });
    } else if (resp.data.msg === "loggedIn") {
      swal({
        title: "success",
        icon: "success",
      });
      dispatch(logInAction(resp.data));
      dispatch(closeModal());
    }
  }

  return (
    <div className="login-form">
      <form>
        <button className="facebook-login">Connect With Facebook</button>
        <button className="google-login">Connect With Google</button>
        <div className="login-or center">
          <span>or</span>
          <div className="or-divider"></div>
        </div>
        <input
          type="text"
          className="login-input"
          placeholder="Email address"
          onChange={changeEmail}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          onChange={changePassword}
        />
        <button className="sign-up-button" onClick={submitLogIn}>
          Login
        </button>
        <div className="divider"></div>
        <div>
          Don't have an account?{" "}
          <span
            className="li-su-switch"
            onClick={() => dispatch(openModal("SignUp"))}
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}
