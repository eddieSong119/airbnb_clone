import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import Spinner from "../../utility/Spinner/Spinner";
import Styles from "./PaymentSuccess.module.css";

export default function PaymentSuccess() {
  const stripeToken = useParams().StripToken;
  const token = useSelector((state) => state.persistedReducer.auth.token);
  const data = { stripeToken, token };

  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({});
  const [userData, setUserData] = useState({});
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      const url = `${window.apiHost}/payment/check_status`;
      const paymentInfo = { stripeToken };
      const resp = await axios.post(url, paymentInfo);
      if (resp.data.status === "confirmed") {
        clearInternal(interval);
        setPaymentSucceeded(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [stripeToken]);

  useEffect(() => {
    if (paymentSucceeded) {
      const url = `${window.apiHost}/payment/success`;
      async function getData() {
        const resp = await axios.post(url, data);
        setReservationDetails(resp.data.reservationDetails);
        setUserData(resp.data.userData);
        setWaiting(false);
      }
      getData();
    }
  }, [paymentSucceeded, stripeToken]);

  if (waiting) {
    return <Spinner />;
  } else {
    return (
      <div className={`${Styles.ReservationSuccess} row`}>
        <h1 className="col m12 center">Start Packing!</h1>
        <div className="col s8 offset-s2">
          <div className={`${Styles.Confirmed} col m12 row`}>
            Confirmed: {reservationDetails.diffDays} nights in{" "}
            {reservationDetails.venueData.location}
            <div className={Styles.HeaderText}>
              <div>Booked by: {userData.email}</div>
              <div>{moment().format("MMMM Do, YYYY")}</div>
            </div>
          </div>
          <div className={`${Styles.ConfirmedDetail} row`}>
            <div className="col m5">
              <div className={`${Styles.Bordered} col`}>
                <div className={`col m12 ${Styles.Upper}`}>
                  <div className="left">Check in</div>
                  <div className="right">Check out</div>
                </div>
                <div className={`col m12 ${Styles.Lower}`}>
                  <div className="left">
                    {moment(reservationDetails.checkIn).format("MMM Do, YYYY")}
                  </div>
                  <div className="right">
                    {moment(reservationDetails.checkOut).format("MMM Do, YYYY")}
                  </div>
                </div>
                <div className={`col m12 ${Styles.TitleText}`}>
                  {reservationDetails.venueData.title}
                </div>
                <div className={`col m12 ${Styles.Details}`}>
                  {reservationDetails.venueData.details}
                </div>
              </div>
            </div>

            <div className="col m7">
              <div className={`${Styles.Bordered} col`}>
                <div className={`col m12 upper ${Styles.Charges}`}>
                  <div className={`${Styles.ChargesText} col m12`}>Charges</div>
                  <div className="row col m12">
                    <div className="left">
                      ${reservationDetails.pricePerNight} x{" "}
                      {reservationDetails.diffDays} days
                    </div>
                    <div className="right">
                      ${reservationDetails.totalPrice}
                    </div>
                  </div>
                  <div className="row col m12">
                    <div className="left">Discount</div>
                    <div className="right">$0</div>
                  </div>
                  <div className="row col m12 total">
                    <div className="left">TOTAL</div>
                    <div className="right">
                      ${reservationDetails.totalPrice}
                    </div>
                  </div>
                </div>
                {console.log(userData)}
                <div className="col m12 row">
                  To rview or make changes to your reservation in the future,
                  visit your{" "}
                  <Link to={`/account/${userData.email}`}>account page</Link>
                </div>
                <div className={`col m12 ${Styles.ResvImage}`}>
                  <img
                    src={reservationDetails.venueData.imageUrl}
                    alt="reservation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
