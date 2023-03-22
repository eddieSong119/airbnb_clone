import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SearchBox from './SearchBox/SearchBox'
import Styles from './Home.module.css'
import Spinner from '../../Utility/Spinner/Spinner'
import Cities from '../../Utility/Cities/Cities'
import Activities from '../../Utility/Activities/Activities'
import Venues from '../../Utility/Venues/Venues'

export default function Home(props) {
  //initialze the states hooks
  //Cities
  const [ recommendedCities, setRecommendedCities] = useState([]);
  const [ europeCities, setEuropeCities ] = useState({});
  const [ asiaCities, setAsiaCities ] = useState({});
  const [ exoticCities, setExoticCities ] = useState({});
  //Activities
  const [ todayActivities, setTodayActivities ] = useState([]);
  //Venues
  const [ recommendedVenues, setRecommendedVenues ] = useState({});


  //Get List of Recommended Cities
  useEffect(()=>{
    //initialize the urls
    //Cities
    const recommendedCitiesUrl = `${window.apiHost}/cities/recommended`;
    const europeCitiesUrl = `${window.apiHost}/cities/europe`;
    const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
    const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;
    //Activities
    const todayActivitiesUrl = `${window.apiHost}/activities/today`;
    //Venues
    const recommendedVenuesUrl = `${window.apiHost}/venues/recommended`;
    //create Promises lists to fetch the promise given back from axios requests
    const getDataPromises = [];

    async function getData() {
      //Data of Cities
      //push the Promises back from axios requests to the list
      getDataPromises.push(axios.get(recommendedCitiesUrl));
      getDataPromises.push(axios.get(europeCitiesUrl));
      getDataPromises.push(axios.get(asiaCitiesUrl));
      getDataPromises.push(axios.get(exoticCitiesUrl));
      //push the Promises back from axios requests to the list
      getDataPromises.push(axios.get(todayActivitiesUrl));
      //push the Promises back from axios requests to the list
      getDataPromises.push(axios.get(recommendedVenuesUrl));
      //wait until all requests done and set up the states
      const dataResponse = await Promise.all(getDataPromises);
      // //wait until all requests done and set up the states
      // const activityResponse = await Promise.all(activitiesPromises);
      // //wait until all requests done and set up the states
      // const venuesResponse = await Promise.all(venuesPromises);
      //Data of Cities
      setRecommendedCities(dataResponse[0].data);
      setEuropeCities(dataResponse[1].data);
      setAsiaCities(dataResponse[2].data);
      setExoticCities(dataResponse[3].data);
      //Data of Activities
      setTodayActivities(dataResponse[4].data);
      //Data of Venues
      setRecommendedVenues(dataResponse[5].data);
    }
     getData();
  },[])
  //If haven't receivied any data from API, load the Spinner.
  if(recommendedCities.length === 0) {
    return(
      <Spinner/>
    )
  }

  return (
    <div>
      <div className={`row ${Styles.SearchBoxContainer}`}>
        <div className='col s9 m6 l6 xl3  offset-s1 offset-m1 offset-l1 offset-xl1'>
           <SearchBox/>
        </div>
      </div>
      <div className={Styles.LowerContainer}>
        <Cities cities={recommendedCities} header='Recommended cities for you'/>
        <Activities activities={todayActivities} header='Today in your area'/>
        <Cities cities={europeCities.cities} header={europeCities.header}/>
        <Cities cities={asiaCities.cities} header={asiaCities.header}/>
        <Venues venues={recommendedVenues.venues} header={recommendedVenues.header}/>
        <Cities cities={exoticCities.cities} header={exoticCities.header}/>
      </div>
    </div>
  )
}

 