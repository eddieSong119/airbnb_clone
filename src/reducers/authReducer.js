export default (state = {}, action) => {
  if (action.type === "REGISTER_ACTION") {
    return action.payload;
  } else if (action.type === "LOGOUT_ACTION") {
    return {};
  } else if (action.type === "LOGIN_ACTION") {
    return action.payload;
  } else {
    return state;
  }
};
