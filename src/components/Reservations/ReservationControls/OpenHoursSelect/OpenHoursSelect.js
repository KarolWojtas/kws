import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {parse, format, roundToNearestMinutes, isBefore, addMinutes, addHours, differenceInMinutes, subMinutes} from 'date-fns'
import {generate} from 'rxjs'
import {bufferCount} from 'rxjs/operators'
import {I18n} from 'aws-amplify'

const openHoursSelect = props => {
    const timeFormatLiteral = 'HH:mm'
    const {open, close, offset, isToday, now, selectedDate} = props
    const startAndEndTime = determineSelectHours(open, close, offset, isToday, now, selectedDate)

    if(!startAndEndTime.start || !startAndEndTime.end){
        return (<List>
            <ListItem><ListItemText primary={I18n.get('ReservationsPage-no-reservations-available')}/></ListItem>
        </List>)
    }
    let options = null;    
    generate(startAndEndTime.start, date => isBefore(date, startAndEndTime.end), date => addMinutes(date, 30)).pipe(
            bufferCount(100)
        ).subscribe(result => options = result.map((date, ix) => (
            <ListItem key={ix} button onClick={() => props.handleSelectTime(date)}>
                <ListItemText primary={format(date, timeFormatLiteral)}/>
            </ListItem>
        )))
    return (<List >
        {options}
    </List>)
}
export function determineSelectHours(openHours, closeHours, offsetHours, isToday, nowDate, selectedDate){
    const timeFormatLiteral = 'HH:mm'
    let startDate = undefined
    let closeDate = parse(
        closeHours,
        timeFormatLiteral,
        selectedDate
    )
    if(isToday){
        const roundedNow = roundToNearestMinutes(nowDate, 30)
        let allowedReservationStart = isBefore(roundedNow, nowDate) ? addMinutes(roundedNow, 30) : roundedNow;
        allowedReservationStart = addHours(allowedReservationStart, offsetHours)

        if(differenceInMinutes(closeDate, allowedReservationStart) <  30){
            return {
                start: undefined,
                end: undefined
            }
        }
        startDate = allowedReservationStart;
        return {
            start: allowedReservationStart,
            end: subMinutes(closeDate, 30)
        }
    } else {
        startDate = parse(
                openHours,
                timeFormatLiteral,
                selectedDate
            )
        return {
            start: startDate,
            end: subMinutes(closeDate, 30)
        }
    }
}

export default openHoursSelect