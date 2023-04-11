import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./utility/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Modal from "./utility/Modal/Modal";
import CityVenues from "./pages/CityVenues/CityVenues";
import VenuePage from "./pages/VenuePage/VenuePage";
import Account from "./pages/Account/Account";
import Bookings from "./pages/Account/Bookings";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import ChangePassword from "./pages/Account/ChangePassword";
import Search from "./pages/Search/Search";

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
