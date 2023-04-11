import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import moment from "moment";

import AccountSideBar from "./AccountSideBar";
import Styles from "./Account.module.css";
import axios from "axios";
import storeBookingAction from "../../actions/StoreBookings";

export default function Account() {
  const dispatch = useDispatch();
  const accountInfo = useSelector((state) => state.persistedReducer.auth);

  useEffect(() => {
    const accountUrl = `${window.apiHost}/users/getBookings`;
    const sendData = {
      token: accountInfo.token,
    };
    async function getData(sendData) {
      const resp = await axios.post(accountUrl, sendData);
      let pastBookings = [];
      let upcomingBookings = [];
      resp.data.map((booking) => {
        const today = moment();
        const checkOutDate = moment(booking.checkOut);
        const diffDays = checkOutDate.diff(today, "days");
        if (diffDays < 0) {
          pastBookings.push(booking);
        } else {
          upcomingBookings.push(booking);
        }
      });
      dispatch(storeBookingAction([upcomingBookings, pastBookings]));
    }
    getData(sendData);
  }, []);

  return (
    <>
      <div className="row">
        <div className={`col s3 l1 ${Styles.SideWrapper}`}>
          <AccountSideBar accountInfo={accountInfo} />
        </div>
        <div className="col s7 l7 offset-l3">
          <Outlet />
        </div>
      </div>
    </>
  );
}
