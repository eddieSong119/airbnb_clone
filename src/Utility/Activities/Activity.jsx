import React from 'react'
import Styles from './Activity.module.css'

export default function City(props) {
  const { image, activityType, title, rating, cost, totalRatings } = props.activity;

  return (
    <div>
      <div className={Styles.ActivityCard}>
        <div className={Styles.ActivityImage}>
          <img src={image} alt='activity'/>
        </div>
        <div className={Styles.ActivityType}>{activityType}</div>
        <div className={Styles.ActivityTitle}>{title}</div>
        <div className={Styles.Cost}>From ${cost} per person</div>
        <div className={Styles.Rating}>
            {rating} ({totalRatings})
        </div>
      </div>
    </div>
  );
}