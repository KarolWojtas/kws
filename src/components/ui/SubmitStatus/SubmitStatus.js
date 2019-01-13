import React from 'react'
import {STATUS_SUBMIT_PENDING, STATUS_SUBMIT_SUCCESS, STATUS_SUBMIT_FAIL} from '../../../store/reducers/reservationReducer'
import CheckCircle from '@material-ui/icons/CheckCircleOutlineTwoTone'
import HightlightOff from '@material-ui/icons/HighlightOffTwoTone'
import Typography from '@material-ui/core/Typography'
import {I18n} from 'aws-amplify'
import styles from './SubmitStatus.module.css'
import SpinnerNoodle from '../SpinnerNoodle/SpinnerNoodle'

const submitStatus = props => {
    const {status} = props
    let icon = null
    let description = I18n.get(status.message)
    switch(status.key){
        case STATUS_SUBMIT_PENDING: {
            icon = (
                <div className={styles.LoadingWrapper}>
                <SpinnerNoodle />
                </div>
            )
            break
        }
        case STATUS_SUBMIT_SUCCESS: {
            icon = <CheckCircle className={styles.IconSuccess} fontSize={'large'}/>
            break
        }
        case STATUS_SUBMIT_FAIL: {
            icon = <HightlightOff className={styles.IconFail} fontSize={'large'}/>
            break
        }
        default: {
            icon = null
            description = 'idle'
        };
    }
    return (
        <div className={styles.RootContainer}>
            {icon}
            <Typography>{description}</Typography>
        </div>
    )
}
export default submitStatus