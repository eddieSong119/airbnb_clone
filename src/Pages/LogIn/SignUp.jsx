import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

import "./LogIn.css";
import openModal from "../../Actions/openModal";
import registration from "../../Actions/registrationAction";
import closeModal from "../../Actions/closeModal";

export default function SignUp() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lowerContent, setLowerContent] = useState(
    <button type="button" onClick={showInput} className="sign-up-button">
      Sign up with email
    </button>
  );

  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }

  function showInput() {
    setLowerContent(
      <div>
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
        <button className="sign-up-button">Sign up</button>
      </div>
    );
  }

  async function submitSignUp(e) {
    e.preventDefault();
    const url = `${window.apiHost}/users/signup`;
    const resp = await axios.post(url, { email, password });
    if (resp.data.msg === "userExists") {
      swal({
        title: "Email Address Exists",
        text:
          "This Email address had been used by other users, please change another one.",
        icon: "error",
      });
    } else if (resp.data.msg === "invalidData") {
      swal({
        title: "Invalid email/password",
        text: "Please provide a valid email or password",
        icon: "error",
      });
    } else if (resp.data.msg === "userAdded") {
      swal({
        title: "Success!",
        icon: "success",
      });
      // send the object gets back from server to redux store
      dispatch(registration(resp.data));
      dispatch(closeModal());
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={submitSignUp}>
        <button className="facebook-login">Connect With Facebook</button>
        <button className="google-login">Connect With Google</button>
        <div className="login-or center">
          <span>or</span>
          {lowerContent}
          <div className="or-divider"></div>
        </div>
        <div className="divider"></div>
        <div>
          Already have an account?{" "}
          <span
            className="li-su-switch"
            onClick={() => dispatch(openModal("LogIn"))}
          >
            Log in
          </span>
        </div>
      </form>
    </div>
  );
}
