import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Spinner from "../../utility/Spinner/Spinner";
import Cities from "../../utility/Cities/Cities";
import Activities from "../../utility/Activities/Activities";
import Venues from "../../utility/Venues/Venues";
import Styles from "../Home/Home.module.css";

export default function Search() {
  const searchTerm = useParams().searchTerm;
  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [apiResponsed, setApiResponsed] = useState(false);

  useEffect(() => {
    const url = `${window.apiHost}/search/${searchTerm}`;
    const getData = async () => {
      const resp = await axios.get(url);
      setActivities(resp.data.activities);
      setCities(resp.data.cities);
      setVenues(resp.data.venues);
      setApiResponsed(true);
    };
    getData();
  }, []);

  if (!apiResponsed) {
    return <Spinner />;
  } else {
    console.log(cities);
    console.log(activities);
    console.log(venues);
    return (
      <div className={`${Styles.LowerContainer} container-fluid`}>
        <div className="row">
          <div className="col s12">
            <Cities
              cities={cities}
              header={`Cities matching your search: "${searchTerm}"`}
            />
          </div>
          <div className="col s12">
            <Activities
              activities={activities}
              header={`Activities matching your search: "${searchTerm}"`}
            />
          </div>
          <div className="col s12">
            <Venues
              venues={venues}
              header={`Venues matching your search: "${searchTerm}"`}
            />
          </div>
        </div>
      </div>
    );
  }
}
