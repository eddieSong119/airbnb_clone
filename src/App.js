import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom';

import NavBar from './Utility/NavBar/NavBar'
import Home from './Pages/Home/Home'
import Modal from './Utility/Modal/Modal'
import CityVenues from './Pages/CityVenues/CityVenues'
import VenuePage from './Pages/VenuePage/VenuePage'

import './App.css';
import './reset.css'

export default function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Fragment><NavBar/><Modal/></Fragment>}/> */}
        <Route path='/' element={<Fragment><NavBar/><Home/><Modal/></Fragment>}/>
        <Route exact path="/city/:cid" element={<Fragment><NavBar/><CityVenues/><Modal/></Fragment>} />
        <Route exact path="/venue/:vId" element={<Fragment><NavBar/><VenuePage/><Modal/></Fragment>} />
      </Routes>
    </div>
  )
}



 