const openModal = (content) => {
  return {
    type: "open_modal",
    payload: {
      content,
    },
  };
};

export default openModal;
