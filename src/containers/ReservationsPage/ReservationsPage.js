import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as creators from '../../store/actions/actionCreators'
import ReservationControls from '../../components/Reservations/ReservationControls/ReservationControls'
import RestaurantView from '../../components/Reservations/ResturantView/RestaurantView'
import Grid from '@material-ui/core/Grid'
import styles from './ReservationsPage.module.css'

class ReservationsPage extends Component{
    state = {
        selectedDate: undefined,
        selectedDateTime: undefined,
        isCalendarDialogOpen: false,
        isTimeSelectDialogOpen: false,
        selectedDateOpenHours: undefined
    }
    componentDidMount(){

        this.handleSetDate(new Date())
    }
    handleSetDate = date => {
        this.props.setDateTime(undefined)
        this.setState({
            selectedDate: date,
            selectedDateTime: undefined,
            selectedDateOpenHours: this.props.openHours[date.getDay()]
        })
    }
    handleSetDateTime = dateTime => {
        this.setState({
            selectedDateTime: dateTime,
            isTimeSelectDialogOpen: false,
        })
        this.props.setDateTime(dateTime)
    }
    handleCloseCalendarDialog = () => {
        this.setState({isCalendarDialogOpen: false})
    }
    handleOpenCalendarDialog = () => {
        this.setState({isCalendarDialogOpen: true})
    }
    handleOpenTimeSelectDialog = () => this.setState({isTimeSelectDialogOpen: true})

    handleCloseTimeSelectDialog = () => this.setState({isTimeSelectDialogOpen: false})

    handleSelectTable = tableId => {
        if(this.props.reservation.tables.includes(tableId)){
            this.props.removeTable(tableId)
        } else {
            this.props.addTable(tableId)
        }
    }
    canSendReservation = () => {
        return this.props.reservation.tables.length > 0 && this.props.reservation.date
    }
    render(){
        return ( <Grid container justify={'center'}>
            <Grid item md={4} className={styles.ReservationControlsContainer}>  
                    <ReservationControls
                        handleOpenDialog={this.handleOpenCalendarDialog}
                        handleCloseDialog={this.handleCloseCalendarDialog}
                        isCalendarDialogOpen={this.state.isCalendarDialogOpen}

                        handleOpenTimeDialog={this.handleOpenTimeSelectDialog}
                        handleCloseTimeDialog={this.handleCloseTimeSelectDialog}
                        isTimeDialogOpen={this.state.isTimeSelectDialogOpen}
                        openHours={this.state.selectedDateOpenHours}

                        dateValue={this.state.selectedDate}
                        dateTimeValue={this.state.selectedDateTime} 
                        handleSetCalendarDate={this.handleSetDate}
                        handleSetFinalDate={this.handleSetDateTime}
                        reservation={this.props.reservation}
                        
                        canSendReservation={this.canSendReservation}
                        />
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
        reservation: state.currentReservation,
        openHours: state.openHours,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTable: tableId => dispatch(creators.addTableToReservation(tableId)),
        removeTable: tableId => dispatch(creators.removeTableFromReservation(tableId)),
        setDateTime: dateTime => dispatch(creators.setReservationDate(dateTime))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage)