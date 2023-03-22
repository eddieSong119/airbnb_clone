import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import TopNavBar from './TopNavBar'
import BottomNavBar from './BottomNavBar'


function NavBar() {
  // Check if this page is home page, for the color change of nav bar
  const isHomePage = (Object.keys(useParams()).length === 0)
  // Switch Top/Bottom nav bar based on the width of the screen
  const [width, setWidth] = useState(window.innerWidth);
  const swithpoint = 1200;
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return width > swithpoint ? 
    <>
      <TopNavBar isHomepage={isHomePage}/>
      <Outlet/>
    </> 
    : 
    <>
      <BottomNavBar/>
      <Outlet/>
    </>;
}

export default NavBar;