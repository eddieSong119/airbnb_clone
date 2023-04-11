import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ResponsiveNavBar.css";

import openModal from "../../actions/openModal";
import logOut from "../../actions/logOut";

function NavBar() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  //Nav links before and after login/signup
  const email = useSelector((state) => state.persistedReducer.auth.email);
  // Check in this page is home page
  const isHomePage = Object.keys(useParams()).length === 0;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const clickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <nav className={`navbar ${isHomePage ? "homepage" : ""}`}>
        <Link to="/" className="navbar-brand">
          Airbnb
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          {email ? (
            <>
              <Link
                to={`/account/${email}`}
                className={`navbar-link ${isHomePage ? "homepage" : ""}`}
              >
                {email}
              </Link>
              <Link
                to="/"
                className={`navbar-link ${isHomePage ? "homepage" : ""}`}
                onClick={clickLogOut}
              >
                LogOut
              </Link>
            </>
          ) : (
            <>
              <div
                className={`navbar-link ${isHomePage ? "homepage" : ""}`}
                onClick={() => dispatch(openModal("LogIn"))}
              >
                Log in
              </div>
              <div
                className={`navbar-link ${isHomePage ? "homepage" : ""}`}
                onClick={() => dispatch(openModal("SignUp"))}
              >
                Sign up
              </div>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
