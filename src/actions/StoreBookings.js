export default (bookings) => {
  return {
    type: "STORE_BOOKINGS",
    payload: bookings,
  };
};
