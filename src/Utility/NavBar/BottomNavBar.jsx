import React from 'react'

import Styles from './BottomNavBar.module.css'

export default function BottomNavBar(props) {
  return (
    <div className={`row ${Styles.Wrapper}`}>
        <div className={`col s4 ${Styles.Tab}`}>account</div>
        <div className={`col s4 ${Styles.Tab}`}>account</div>
        <div className={`col s4 ${Styles.Tab}`} onClick={props.openModal}>account</div>
    </div>
  )
}
