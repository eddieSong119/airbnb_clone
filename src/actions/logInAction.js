export default (logInObj) => {
  return {
    type: "LOGIN_ACTION",
    payload: logInObj,
  };
};
