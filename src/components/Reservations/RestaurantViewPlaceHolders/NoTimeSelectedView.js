import React from 'react'
import styles from './NoTimeSelectedView.module.css'    
import SpinnerNoodleAlt from '../../ui/SpinnerNoodleAlt/SpinnerNoodleAlt'
import Typography from '@material-ui/core/Typography'
import {I18n} from 'aws-amplify'

const noTimeSelectedView = props => (
    <div className={styles.RootContainer}>
        <SpinnerNoodleAlt />
        <Typography>{I18n.get('ReservationsPage-view-alt')}</Typography>
    </div>
)
export default noTimeSelectedView