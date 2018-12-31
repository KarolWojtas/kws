import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {parse, format, roundToNearestMinutes, isBefore, addMinutes, addHours, differenceInMinutes, subMinutes} from 'date-fns'
import {generate} from 'rxjs'
import {bufferCount} from 'rxjs/operators'
import {I18n} from 'aws-amplify'


const openHoursSelect = props => {
    const {open, close, offset, isToday, now, selectedDate} = props
    const timeFormatLiteral = 'HH:mm'
    let closeDate = parse(
        close,
        'HH:mm',
        selectedDate
    )
    let startDate = undefined;
    let noReservations = false
    if(isToday){
    const roundedNow = roundToNearestMinutes(now, 30)
    let roundedUp = isBefore(roundedNow, now) ? addMinutes(roundedNow, 30) : roundedNow;
    roundedUp = addHours(roundedUp, 3)
    if(differenceInMinutes(closeDate, roundedUp) < offset * 60){
        noReservations = true
    }
    startDate = roundedUp;

    } else {
        startDate = parse(
            open,
            'HH:mm',
            selectedDate
        )
    }
    if(noReservations){
        return (<List>
            <ListItem><ListItemText primary={I18n.get('ReservationsPage-no-reservations-available')}/></ListItem>
        </List>)
    }
    closeDate = subMinutes(closeDate, 30);
    let options = null;    
    generate(startDate, date => isBefore(date, closeDate), date => addMinutes(date, 30)).pipe(
            bufferCount(1000)
        ).subscribe(result => options = result.map((date, ix) => (
            <ListItem key={ix} button onClick={() => props.handleSelectTime(date)}>
                <ListItemText primary={format(date, timeFormatLiteral)}/>
            </ListItem>
        )))
    return (<List >
        {options}
    </List>)
}

export default openHoursSelect