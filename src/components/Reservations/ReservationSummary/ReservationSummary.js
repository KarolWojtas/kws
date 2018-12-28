import React from 'react'
import PropTypes, { number } from 'prop-types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';

const reservationSummary = props => {
    const date = new Date();
    return ( <div>
        <List>
            <ListItem>
                <ListItemText primary={'Seats:'} secondary={props.reservation.seats}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={'Date:'} secondary={`${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}/>
            </ListItem>
        </List>
    </div>)
}
reservationSummary.propTypes = {
    reservation: PropTypes.shape({
        tables: PropTypes.array,
        seats: number,
        date: PropTypes.date
    })
}
export default reservationSummary