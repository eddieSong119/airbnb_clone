import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Bookings() {
  const upcomingBookings = useSelector(
    (state) => state.persistedReducer.bookings
  )[0];
  const pastBookings = useSelector(
    (state) => state.persistedReducer.bookings
  )[1];
  const token = useSelector((state) => state.persistedReducer.auth.token);
  const bookingType = useParams();
  const bookings =
    bookingType.confirmed === "confirmed" ? upcomingBookings : pastBookings;

  const cancelBooking = async (bid, location) => {
    const cancel = await swal({
      buttons: true,
      text: `Are you sure you want to cancel your trip to ${location}`,
      icon: "warning",
    });
    if (cancel) {
      const url = `${window.apiHost}/reservation/cancel`;
      const data = {
        token,
        bid,
      };
      const resp = await axios.post(url, data);
      if (resp.data.msg === "cancelled") {
        swal({
          title: "canceled",
          icon: "success",
        });
      } else {
        swal({
          title: "There was an error in cancellation",
          icon: "error",
        });
      }
    }
  };

  const showingBookings = bookings.map((booking, i) => {
    const dates = `${moment(booking.checkIn).format("MMM Do")} - ${moment(
      booking.checkOut
    ).format("MMM Do YYYY")}`;
    return (
      <tr key={i} className="booking-row">
        <td>
          {booking.status === "confirmed" && bookingType.confirmed === "past"
            ? "complete"
            : booking.status}
        </td>
        <td>
          <div className="booking-detail">{dates}</div>
          <div className="booking-detail">{booking.venueData.title}</div>
          <div className="booking-detail">{booking.venueData.location}</div>
        </td>
        <td>
          <div className="booking-detail">Confirmation #: {booking.conf}</div>
          <div className="booking-detail">
            {booking.numberOfGuests} Guests, {booking.diffDays} Nights
          </div>
          <div className="booking-detail">
            ${booking.pricePerNight} per night
          </div>
          <div className="booking-detail">${booking.totalPrice} Total</div>
        </td>
        <td>
          <div className="booking-detail pointer">Print Reservation</div>
          {bookingType.confirmed === "confirmed" &&
          booking.status !== "cancelled" ? (
            <div
              onClick={() =>
                cancelBooking(booking.id, booking.venueData.location)
              }
              className="booking-detail pointer"
            >
              Cancel Booking
            </div>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  });

  return (
    <table className="booking">
      <thead>
        <tr>
          <th>Status</th>
          <th>Dates and location</th>
          <th>Details</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{showingBookings}</tbody>
    </table>
  );
}
