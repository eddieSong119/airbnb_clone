import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Styles from "./Modal.module.css";
import closeModal from "../../actions/closeModal";
import SignUp from "../../pages/LogIn/SignUp";
import LogIn from "../../pages/LogIn/LogIn";

function Modal() {
  //initialize the dispatch function using hook
  const dispatch = useDispatch();
  //get the content shows in the modal
  const contentType = useSelector(
    (state) => state.persistedReducer.modal.content
  );
  let content;
  switch (contentType) {
    case "LogIn":
      content = <LogIn />;
      break;
    case "SignUp":
      content = <SignUp />;
      break;
    default:
      content = <LogIn />;
      break;
  }

  //initialize the style tag to control if the modal shows
  let DisplayControl = {
    display: useSelector((state) => state.persistedReducer.modal.display),
  };

  return (
    <div style={DisplayControl}>
      <div className={Styles.Wrapper}>
        <div className={Styles.Content}>
          <button
            id={Styles.closeButton}
            onClick={() => dispatch(closeModal())}
          >
            x
          </button>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Modal;
