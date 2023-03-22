import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Styles from './TopNavBar.module.css'
import openModal from '../../Actions/openModal'
import logOut from '../../Actions/logOut'

export default function TopNavBar(props) {
  const dispatch = useDispatch()
  //The nav bar is transparent in homepage, and black in other pages 
  const wrapperStyle = (props.isHomepage ? Styles.WrapperTransparent : Styles.WrapperBlack)
  //Nav links before and after login/signup
  const email = useSelector(state => state.persistedReducer.auth.email);
  
  function clickLogOut() {
    dispatch(logOut());
  };

  return (
    <div className={`row ${wrapperStyle}`}>
      <div className={`col s1`}><Link to='/' className={Styles.Title}>Airbnb</Link></div>
      <div className={`col s1 offset-s5`}><Link to="/" className={Styles.Link}>English (US)</Link></div>
      <div className={`col s1`}><Link to="/" className={Styles.Link}>$ USD </Link></div>
      <div className={`col s1`}><Link to="/" className={Styles.Link}>Become a host</Link></div>
      <div className={`col s1`}><Link to="/" className={Styles.Link}>Help</Link></div>
      {
        email
        ? <>
            <div className={`col s1`}><Link to={`/account/${email}`} className={Styles.Link}>{email}</Link></div>
            <div className={`col s1`}><Link to="/" className={Styles.Link} onClick={clickLogOut}>LogOut</Link></div>
          </>
        : <>
            <div className={`col s1`}><div className={Styles.Link} onClick={() => dispatch(openModal('LogIn'))}>Log in</div></div>
            <div className={`col s1`}><div className={Styles.Link} onClick={() => dispatch(openModal('SignUp'))}>Sign up</div></div>
          </>
      }
    </div>
  )
}
