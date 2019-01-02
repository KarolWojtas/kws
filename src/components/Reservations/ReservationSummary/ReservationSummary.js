import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {I18n} from 'aws-amplify'
import styles from './ReservationSummary.module.css'

const reservationSummary = React.forwardRef((props, ref) => {
    const fields = [
        {label: 'ReservationsPage-summary-seats-label', 
            value: props.seats ? props.seats : I18n.get('ReservationsPage-summary-seats-error')},
        {label: 'ReservationsPage-summary-date-label', value: props.date},
        {label: 'ReservationsPage-summary-email-label', value: props.email},
        {label: 'ReservationsPage-summary-description-label', value: props.description}
    ]
    const summary = fields.map((field, ix) => (
        <Grid container key={ix}>
            <Grid item lg={6} xs={12}>
                <Typography
                    gutterBottom className={styles.Label}
                > - {I18n.get(field.label)}</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography
                    gutterBottom
                >{field.value}</Typography>
            </Grid>
        </Grid>
            
        
    ))
    return (<div ref={ref}>
        <Grid container>
            {summary}
            <Grid item lg={12} className={styles.FinalizeBar}>
                <Button disabled={!props.canSubmitReservation()} variant={'contained'}>{I18n.get('ReservationsPage-finalize-reservation-btn')}</Button>
            </Grid>
        </Grid>
    </div>)
})
export default reservationSummary