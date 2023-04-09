import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import Styles from "./VenuePage.module.css";
import Point from "./Point";
import openModal from "../../actions/openModal";
import loadScript from "../../utilityFunctions/loadScript";

// This page shows the detailed information of a single venue
export default function VenuePage(props) {
  //Get the id of the venue from params passed by router (using useParams hook)
  const { vId } = useParams();
  const token = useSelector((state) => state.persistedReducer.auth.token);
  const venueUrl = `${window.apiHost}/venue/${vId}`;
  const pointsUrl = `${window.apiHost}/points/get`;

  //initialize the state of the sigle venue showing on this page and points list
  const [venue, setVenue] = useState({});
  const [pointsList, setPoints] = useState([]);

  //initializa the state of informations in the booking box
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");

  //deconstract venue object
  const { imageUrl, details, guests, location, pricePerNight, title } = venue;
  //get account info
  const accInfo = useSelector((state) => state.persistedReducer.auth);
  const dispatch = useDispatch();

  //Get data before component mount
  useEffect(() => {
    async function getData() {
      const venueResponse = await axios.get(venueUrl);
      setVenue(venueResponse.data);
      //Get the points and descriptions
      const pointsResponse = await axios.get(pointsUrl);
      //Split the points data into a list
      const listPoints = venueResponse.data.points
        .split(",")
        .map((point, i) => {
          return (
            <Point
              key={i}
              point={point}
              pointDescription={pointsResponse.data}
            />
          );
        });
      setPoints(listPoints);
    }
    getData();
  }, []);

  async function reserve() {
    const checkInDateMoment = moment(checkInDate);
    const checkOutDateMoment = moment(checkOutDate);
    const reservedDays = checkOutDateMoment.diff(checkInDateMoment, "days");

    if (reservedDays < 1) {
      swal({
        title: "The checkout date must be after the check in date",
        icon: "error",
      });
    } else if (isNaN(reservedDays)) {
      swal({
        title: "Please Check the picked dates are valid.",
        icon: "error",
      });
    } else {
      const totalPrice = pricePerNight * reservedDays;
      const scriptUrl = "https://js.stripe.com/v3";
      const stripePublicKey =
        "pk_test_51Mtr2dGFXXncKqay1vYTmXuORD6TAz5jxEkRbWe3aVHr4OrIJEEedxwiohNZTXsLXjDPQ8xPX8iJEjDgQz23P8oO00BHjSK6kn";
      await loadScript(scriptUrl);
      const stripe = window.Stripe(stripePublicKey);
      const stripSessionUrl = `${window.apiHost}/payment/create-session`;
      const data = {
        venueData: venue,
        totalPrice,
        diffDays: reservedDays,
        pricePerNight,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        token,
        numberOfGuests,
        currency: "USD",
      };
      const sessionVar = await axios.post(stripSessionUrl, data);
      stripe
        .redirectToCheckout({
          sessionId: sessionVar.data.id,
        })
        .then((result) => {
          console.log(result);
        });
    }
  }

  return (
    <div className={`row ${Styles.Wrapper}`}>
      <div className={`col s12 ${Styles.ImgWrapper}`}>
        <img className={Styles.Img} src={imageUrl} />
      </div>

      <div className={`col s12 ${Styles.Content}`}>
        <div className={`col s12 m6 l6 ${Styles.Details}`}>
          <div className={Styles.Title}>{title}</div>
          <div className={Styles.Location}>{location}</div>
          <div className={Styles.Guests}>Guests: {guests}</div>
          <hr />
          {pointsList}
          <div className={Styles.DetailInfo}>{details}</div>
        </div>

        <div className={`col s12 m6 l3 offset-l3 ${Styles.BookingBox}`}>
          <div className={Styles.BookingCard}>
            <div className={`col s12 ${Styles.Price}`}>
              ${pricePerNight}/Night
            </div>
            <div className={`col s6 ${Styles.DatePicker}`}>
              <div className={Styles.Text}>Check-In</div>
              <input
                type="date"
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className={`col s6 ${Styles.DatePicker}`}>
              <div className={Styles.Text}>Check-Out</div>
              <input
                type="date"
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
            <div className={`col s12 ${Styles.GuestSelector}`}>
              <div className={Styles.Text}>Guests</div>
              <select
                className={`col s12 ${Styles.Select}`}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guest</option>
                <option value="3">3 Guest</option>
                <option value="4">4 Guest</option>
                <option value="5">5 Guest</option>
                <option value="6">6 Guest</option>
                <option value="7">7 Guest</option>
                <option value="8">8 Guest</option>
              </select>
            </div>
            <div>
              {accInfo.token ? (
                <button
                  className={`col s12 ${Styles.SubmitButton}`}
                  onClick={reserve}
                >
                  Reserve
                </button>
              ) : (
                <div className="col s12 center">
                  please{" "}
                  <span
                    className={Styles.LogInLink}
                    onClick={() => dispatch(openModal("LogIn"))}
                  >
                    Log in
                  </span>{" "}
                  first to reserve
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
