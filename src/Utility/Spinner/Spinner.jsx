import React from 'react'
import SpinnerStyle from './Spinner.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faSpinner)

export default function Spinner() {
  return (
    <div className={SpinnerStyle.SpinnerWrapper}>
        <FontAwesomeIcon icon="spinner" size="6x" spin/>
    </div>
  )
}
 