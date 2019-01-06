import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {I18n} from 'aws-amplify'
import styles from './ReservationSummary.module.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const reservationSummary = React.forwardRef((props, ref) => {
    const fields = [
        {label: 'ReservationsPage-summary-seats-label', 
            value: props.seats ? props.seats : I18n.get('ReservationsPage-summary-seats-error'), 
            props: {
                primaryTypographyProps: props.seats ? {color: 'textPrimary'} : {color: 'error'}
            }},
        {label: 'ReservationsPage-summary-date-label', value: props.date},
        {label: 'ReservationsPage-summary-email-label', value: props.email},
        {label: 'ReservationsPage-summary-description-label', value: props.description ? props.description 
            : I18n.get('ReservationsPage-summary-description-error')}
    ]
    const summary2 = fields.map((field, ix) => (
        <ListItem key={ix}>
            <ListItemText primary={field.value} secondary={I18n.get(field.label)} {...field.props}/>
        </ListItem>
    ))
    return (<div ref={ref}>
        <List>
            {summary2}
        </List>
        <Grid container>
            <Grid item lg={12} className={styles.FinalizeBar}>
                <Button disabled={!props.canSubmitReservation()} variant={'contained'}>{I18n.get('ReservationsPage-finalize-reservation-btn')}</Button>
            </Grid>
        </Grid>
    </div>)
})
export default reservationSummary