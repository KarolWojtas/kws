import React from 'react'
import styles from './NoTimeSelectedView.module.css'    
import SpinnerNoodle from '../../ui/SpinnerNoodle/SpinnerNoodle'
import {I18n} from 'aws-amplify'

const noTimeSelectedView = props => (
    <div className={styles.RootContainer}>
        <SpinnerNoodle />
        <p>{I18n.get('ReservationsPage-view-alt')}</p>
    </div>
)
export default noTimeSelectedView