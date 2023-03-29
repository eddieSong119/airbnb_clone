import React from "react";

import Styles from "./Point.module.css";

export default function Point(props) {
  const description = props.pointDescription.find(
    (pD) => pD.pointTitle === props.point
  ).text;

  return (
    <div className={Styles.Wrapper}>
      <div className={Styles.Title}>{props.point}</div>
      <div className={Styles.Description}>{description}</div>
    </div>
  );
}
