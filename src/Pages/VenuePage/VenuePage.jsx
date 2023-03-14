import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Styles from './VenuePage.module.css'
import Point from './Point'

// This page shows the detailed information of a single venue
export default function VenuePage(props) {
  //Get the id of the venue from params passed by router (using useParams hook)
  const { vId } = useParams();
  const venueUrl = `${window.apiHost}/venue/${vId}`;    
  const pointsUrl = `${window.apiHost}/points/get`;
  //initialize the state of the sigle venue showing on this page and points list
  const [ venue, setVenue ] = useState({});
  const [ pointsList, setPoints ] = useState([]);
  //initializa the state of informations in the booking box
  const [ checkInDate, setCheckInDate ] = useState('');
  const [ checkOutDate, setCheckOutDate ] = useState('');
  const [ numberOfGuests, setNumberOfGuests ] = useState('')
  //deconstract venue object
  const { id, imageUrl, details, guests, location, points, pricePerNight, rating, title } = venue;
  //Get data before component mount
  useEffect(()=> {
    async function getData() {
        const venueResponse = await axios.get(venueUrl);
        setVenue(venueResponse.data);
        //Get the points and descriptions
        const pointsResponse = await axios.get(pointsUrl);
        console.log(pointsResponse.data);
        //Split the points data into a list
        const listPoints = venueResponse.data.points.split(',').map((point, i) => {
            return <Point key={i} point={point} pointDescription={pointsResponse.data}/>;
        })
        setPoints(listPoints);
    };
    getData();
  }, []);

  return (
    <div className={Styles.Wrapper}>
        <div className={Styles.ImgWrapper}>
            <img className={Styles.Img} src={imageUrl}/>
        </div>

        <div className={Styles.Content}>

            <div className={Styles.Details}>
                <div className={Styles.Title}>{title}</div>
                <div className={Styles.Location}>{location}</div>
                <div className={Styles.Guests}>Guests: {guests}</div> 
                <hr />
                {pointsList}
                <div className={Styles.DetailInfo}>{details}</div>
            </div>

            <div className={Styles.BookingBox}>
                <div className={Styles.BookingCard}>
                    <div className={Styles.Price}>${pricePerNight}/Night</div>
                    <div className={Styles.DatePicker}>
                        <div className={Styles.Text}>Check-In</div>
                        <input type='date' onChange={(e) => setCheckInDate(e.target.value)} value={checkInDate}/>
                    </div>
                    <div className={Styles.DatePicker}>
                        <div className={Styles.Text}>Check-Out</div>
                        <input type='date' onChange={(e) => setCheckOutDate(e.target.value)} value={checkOutDate}/>
                    </div>
                    <div className={Styles.GuestSelector}>
                        <div className={Styles.Text}>Guests</div>
                        <select onChange={(e)=>setNumberOfGuests(e.target.value)} value={numberOfGuests}>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guest</option>
                            <option value="3">3 Guest</option>
                            <option value="4">4 Guest</option>
                            <option value="5">5 Guest</option>
                            <option value="6">6 Guest</option>
                            <option value="7">7 Guest</option>
                            <option value="8">8 Guest</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}
