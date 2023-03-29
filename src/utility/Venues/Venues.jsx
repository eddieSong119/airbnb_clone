import React from "react";

import Venue from "./Venue";
import Styles from "./Venues.module.css";

export default function Venues(props) {
  const displayVenues = props.venues.map((venue) => (
    <div key={venue.id} className="col s12 m6 l3">
      <Venue key={venue.id} venue={venue} />
    </div>
  ));

  return (
    <div className={`row s12 ${Styles.Wrapper}`}>
      <div className={`col s12 ${Styles.Title}`}>{props.header}</div>
      <div className={`col s12 ${Styles.Content}`}>{displayVenues}</div>
    </div>
  );
}
