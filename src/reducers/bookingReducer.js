export default (state = {}, action) => {
  if (action.type === "STORE_BOOKINGS") {
    return action.payload;
  } else {
    return state;
  }
};
