import React from 'react'
import PropTypes, { number } from 'prop-types'
import {I18n} from 'aws-amplify'
import Button from '@material-ui/core/Button'
import DateRange from '@material-ui/icons/DateRange'
import AccessTime from '@material-ui/icons/AccessTime'
import styles from './ReservationControls.module.css'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Calendar from 'react-calendar/dist/entry.nostyle'
import {format} from 'date-fns'
import Grid from '@material-ui/core/Grid'
import OpenHoursSelect from './OpenHoursSelect/OpenHoursSelect'
import {isSameDay} from 'date-fns'
import Typography from '@material-ui/core/Typography'

const reservationControls = React.forwardRef((props, ref) => {

    const d = new Date()
    const now = convertToPolandTime(d);
    
    return (<div ref={ref}>
            <Grid container justify={'center'} alignItems={'baseline'}>
                
                <Grid item sm={6} xs={12} className={styles.GridTile}> 
                        <Button 
                            variant={'contained'} 
                            onClick={props.handleOpenCalendarDialog}
                        >
                            <DateRange className={styles.Icon}/>{I18n.get('ReservationsPage-select-date-btn')}
                        </Button>
                </Grid>
                <Grid item sm={6} xs={12} className={styles.GridTile}> 
                    <Typography>
                        {format(props.dateValue, 'd/MM/YYYY', {awareOfUnicodeTokens: true}) }
                    </Typography>
                </Grid>
                
                <Grid item sm={6} xs={12} className={styles.GridTile}> 
                    <Button 
                            variant={'contained'} 
                            onClick={props.handleOpenTimeDialog} 
                            disabled={!props.dateValue}
                    >
                            <AccessTime className={styles.Icon}/>{I18n.get('ReservationsPage-select-time-btn')}
                    </Button>    
                </Grid>
                <Grid item sm={6} xs={12} className={styles.GridTile}> 
                    <Typography>
                    {props.dateTimeValue instanceof Date ? format(props.dateTimeValue, 'HH:mm', 
                        {awareOfUnicodeTokens: true}) : I18n.get('ReservationsPage-choose-time-placeholder') }
                    </Typography>
                </Grid>
            </Grid>
            <Dialog 
                open={props.isCalendarDialogOpen}
                onClose={props.handleCloseCalendarDialog}
            >
                <DialogContent className={styles.Calendar}>
                    <Calendar 
                    value={props.dateValue}
                    onChange={props.handleSetCalendarDate}
                    locale={'pl-PL'}
                    required
                    minDate={now}
                    />    
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseCalendarDialog}>
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
            </div>)
}) 
reservationControls.propTypes = {
    reservation: PropTypes.shape({
        tables: PropTypes.array,
        seats: number,
        date: PropTypes.date
    })
}
export default reservationControls

function convertToPolandTime(d){
    if(d.getTimezoneOffset() === -60){
        return d
    } else {
        const nowLocal = d.getTime()
        const localOffsetMillis = d.getTimezoneOffset()*60000
        const utcMillis = nowLocal + localOffsetMillis
        const polandTimeMillis = (3600000 * 1) + utcMillis
        return new Date(polandTimeMillis);
    }
}