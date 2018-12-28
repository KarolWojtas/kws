import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as creators from '../../store/actions/actionCreators'
import ReservationSummary from '../../components/Reservations/ReservationSummary/ReservationSummary'
import RestaurantView from '../../components/Reservations/ResturantView/RestaurantView'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import styles from './ReservationsPage.module.css'

class ReservationsPage extends Component{

    handleSelectTable = tableId => {
        if(this.props.reservation.tables.includes(tableId)){
            this.props.removeTable(tableId)
        } else {
            this.props.addTable(tableId)
        }
    }
    render(){
        return ( <Grid container >
            <Grid item md={4} >
                <ReservationSummary reservation={this.props.reservation}/>
            </Grid>
            <Grid item md={8} className={styles.RestaurantViewContainer}>
                <RestaurantView
                    handleSelectTable={this.handleSelectTable}
                    allTables={this.props.tables}
                    tablesSelected={this.props.reservation.tables}
                    tablesReserved={[]}
                />
            </Grid>
        </Grid> )
    }
}
const mapStateToProps = state =>{
    return {
        tables: state.tables,
        reservation: state.currentReservation
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTable: tableId => dispatch(creators.addTableToReservation(tableId)),
        removeTable: tableId => dispatch(creators.removeTableFromReservation(tableId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage)