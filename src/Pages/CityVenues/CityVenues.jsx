import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../utility/Spinner/Spinner";
import Venues from "../../utility/Venues/Venues";

export default function CityVenues() {
  const [venues, setVenues] = useState([]);
  const [header, setHeader] = useState("");
  const cityName = useParams().cityName;

  useEffect(() => {
    const url = `${window.apiHost}/venues/city/${cityName}`;
    async function getData() {
      const resp = await axios.get(url);
      console.log(resp.data);
      setVenues(resp.data.venues);
      setHeader(resp.data.header);
    }
    getData();
  }, []);

  if (!header) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Venues venues={venues} header={header} />
      </div>
    );
  }
}
