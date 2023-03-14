import React from 'react';
import { Link } from 'react-router-dom';

import Styles from './Venue.module.css'

export default function Venue(props) {
  const { id, imageUrl, title, location, pricePerNight, rating } = props.venue;

  return (
    <div>
        <Link to={`venue/${id}`}>
            <div className={Styles.Wrapper}>
              <img className={Styles.Img} src={imageUrl} />
              <div className={Styles.Title}>{title}</div>
              <div className={Styles.Price}>{pricePerNight} per night</div> 
              <div className={Styles.Rating}>{rating}</div> 
            </div>
        </Link>
    </div>
  )
}
