import React from 'react'
import { Link } from 'react-router-dom'

import Styles from './City.module.css'


export default function City(props) {
  const { id, image, cityName, price } = props.city;

  return (
    <div>
      <Link to={`/city/${id}`}>
        <div className={Styles.Wrapper}>
            <img className={Styles.Img} src={image}/>
            <div className={Styles.CityName}>{cityName}</div>
            <div className={Styles.Price}>${price} per night</div>
        </div>
      </Link>
    </div>
  );
}
