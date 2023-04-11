import React from "react";

import Activity from "./Activity";
import SlickSlider from "../Slider/Slider";
import Styles from "./Activities.module.css";

export default function Activities(props) {
  //Create a component list of activities
  const displayActivities = props.activities.map((activity) => (
    <div key={activity.id} className="col s12 m6 l2">
      <Activity key={activity.id} activity={activity} />
    </div>
  ));

  return (
    <div className={`row ${Styles.Wrapper}`}>
      <div className={`col s12 ${Styles.Title}`}>{props.header}</div>
      {/* <div className={`col s12 ${Styles.Content}`}>{displayActivities}</div> */}
      <div className={`col s12 ${Styles.Content}`}>
        <SlickSlider elements={displayActivities} />
      </div>
    </div>
  );
}
