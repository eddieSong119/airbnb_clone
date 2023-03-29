import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./Utility/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Modal from "./Utility/Modal/Modal";
import CityVenues from "./Pages/CityVenues/CityVenues";
import VenuePage from "./Pages/VenuePage/VenuePage";
import Account from "./Pages/Account/Account";
import Bookings from "./Pages/Account/Bookings";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import ChangePassword from "./Pages/Account/ChangePassword";
import Search from "./Pages/Search/Search";

import "./App.css";
import "./reset.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Modal />
            </>
          }
        >
          <Route exact path="/" element={<Home />} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/city/:cityName" element={<CityVenues />} />
          <Route path="venue/:vId" element={<VenuePage />} />
          <Route
            exact
            path="payment-success/:StripToken"
            element={<PaymentSuccess />}
          />
          <Route path="account/:email" element={<Account />}>
            <Route path="reservations/:confirmed" element={<Bookings />} />
            <Route path="reservations/:past" element={<Bookings />} />
            <Route
              path="reservations/change-pass"
              element={<ChangePassword />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
