import React from 'react'
import PropTypes, { number } from 'prop-types'
import {I18n} from 'aws-amplify'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import DateRange from '@material-ui/icons/DateRange'
import AccessTime from '@material-ui/icons/AccessTime'
import styles from './ReservationControls.module.css'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Calendar from 'react-calendar'
import {format} from 'date-fns'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import OpenHoursSelect from './OpenHoursSelect/OpenHoursSelect'
import {isSameDay} from 'date-fns'

const reservationControls = props => {
    
    const now = new Date();

    return ( <Card className={styles.RootContainer}>
        <CardContent>
            <List>
                <ListItem>
                    <ListItemText 
                        primary={I18n.get('ReservationsPage-selected-date-title')}
                        primaryTypographyProps={{variant: 'h5'}}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={format(props.dateValue, 'd/MM/YYYY', 
                        {awareOfUnicodeTokens: true}) }/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={props.handleOpenDialog}>
                            <DateRange />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary={I18n.get('ReservationsPage-selected-time-title')}
                        primaryTypographyProps={{variant: 'h5'}}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={props.dateTimeValue instanceof Date ? format(props.dateTimeValue, 'HH:mm', 
                        {awareOfUnicodeTokens: true}) : I18n.get('ReservationsPage-choose-time-placeholder') }/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={props.handleOpenTimeDialog} disabled={!props.dateValue}>
                            <AccessTime/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary={I18n.get('ReservationsPage-selected-seats-title')}
                        primaryTypographyProps={{variant: 'h5'}}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={props.reservation.seats ? props.reservation.seats : I18n.get('ReservationsPage-choose-seats-placeholder') }/>
                </ListItem>
            </List>
            
            <Dialog 
                open={props.isCalendarDialogOpen}
                onClose={props.handleCloseTimeDialog}
            >
                <DialogContent>
                    <Calendar 
                    value={props.dateValue}
                    onChange={props.handleSetCalendarDate}
                    locale={'pl-PL'}
                    required
                    minDate={now}
                    className={styles.Calendar}
                    />    
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseDialog}>
                        {I18n.get('ReservationsPage-calendar-dialog-close')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={props.isTimeDialogOpen}
                onClose={props.handleCloseTimeDialog}
            >
                <DialogContent>
                    {props.openHours ? <OpenHoursSelect 
                        open={props.openHours.open} close={props.openHours.close}
                        selectedDate={props.dateValue} 
                        now={now} offset={3} isToday={isSameDay(props.dateValue, now)}
                        handleSelectTime={props.handleSetFinalDate}    
                    /> : null}
                </DialogContent>
            </Dialog>
            
        </CardContent>
        <CardActions>
            <Button variant={'contained'} color={'secondary'}
                disabled={!props.canSendReservation()}
            >{I18n.get('ReservationsPage-finalize-reservation-btn')}</Button>
        </CardActions>
    </Card>)
}
reservationControls.propTypes = {
    reservation: PropTypes.shape({
        tables: PropTypes.array,
        seats: number,
        date: PropTypes.date
    })
}
export default reservationControls