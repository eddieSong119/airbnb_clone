const initState = { display: "none" };

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case "close_modal":
      return { display: "none" };
    case "open_modal":
      return {
        display: "block",
        content: action.payload.content,
      };
    default:
      return state;
  }
};

export default modalReducer;
