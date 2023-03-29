import React from "react";

import City from "./City";
import Styles from "./Cities.module.css";
import SlickSlider from "../Slider/Slider";

export default function Cities(props) {
  //Create a component list of cities
  const displayCities = props.cities.map((city) => (
    <City key={city.id} city={city} />
  ));

  return (
    <div className={`row ${Styles.Wrapper}`}>
      <div className={`col s12 ${Styles.Title}`}>{props.header}</div>
      <div className={`col s12 ${Styles.Content}`}>
        <SlickSlider elements={displayCities} />
      </div>
    </div>
  );
}
