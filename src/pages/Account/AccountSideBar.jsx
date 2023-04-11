import React from "react";
import Styles from "./Account.module.css";

import { NavLink } from "react-router-dom";

export default function AccountSideBar(props) {
  return (
    <ul className="row" id="sideBar">
      <li className={`col s12`}>
        <NavLink
          activeClassName={Styles.SideBarLinkActive}
          className={Styles.SideBarLink}
          to={`reservations/confirmed`}
        >
          Confirmed Reservations
        </NavLink>
      </li>
      <li className={`col s12`}>
        <NavLink
          activeClassName={Styles.SideBarLinkActive}
          className={Styles.SideBarLink}
          to={`reservations/past`}
        >
          Past Reservations
        </NavLink>
      </li>
      <li className={`col s12`}>
        <NavLink
          activeClassName={Styles.SideBarLinkActive}
          className={Styles.SideBarLink}
          to={`reservations/change-pass`}
        >
          Change your password
        </NavLink>
      </li>
    </ul>
  );
}
