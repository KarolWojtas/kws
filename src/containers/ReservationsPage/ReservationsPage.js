import React, { PureComponent} from 'react'
import {connect} from 'react-redux'
import * as creators from '../../store/actions/actionCreators'
import ReservationControls from '../../components/Reservations/ReservationControls/ReservationControls'
import RestaurantView from '../../components/Reservations/ResturantView/RestaurantView'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from './ReservationsPage.module.css'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import posed, {PoseGroup} from 'react-pose'
import { I18n } from 'aws-amplify';
import ReservationContactForm from '../../components/Reservations/ReservationContactForm/ReservationContactForm'
import ReservationSummary from '../../components/Reservations/ReservationSummary/ReservationSummary'
import {format} from 'date-fns'
import NoTimeRestaurantView from '../../components/Reservations/RestaurantViewPlaceHolders/NoTimeSelectedView'
import { STATUS_SUBMIT_SUCCESS} from '../../store/reducers/reservationReducer'
import ReCAPTCHA from "react-google-recaptcha";

const stepTransitions = {
    enter: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 300,
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 300,
        }
    }
}
const PosedReservationControls = posed(ReservationControls)(stepTransitions)
const PosedReservationContactForm = posed(ReservationContactForm)(stepTransitions)
const PosedReservationSummary = posed(ReservationSummary)(stepTransitions)

class ReservationsPage extends PureComponent{
    state = {
        selectedDate: undefined,
        selectedDateTime: undefined,
        isCalendarDialogOpen: false,
        isTimeSelectDialogOpen: false,
        isSubmitDialogOpened: false,
        selectedDateOpenHours: undefined,
        activeStep: 0,
        email: '',
        description: ''
    }
    reCaptchaRef = React.createRef()

    componentDidMount(){
        this.handleSetDate(new Date())
    }
    componentWillUnmount = () => {
        this.props.clearReservation()
    }
    
    handleSetDate = date => {
        this.handleCloseCalendarDialog()
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
        this.props.loadReservations(dateTime)
        
    }
    handleCloseCalendarDialog = () => {
        this.setState({isCalendarDialogOpen: false})
    }
    handleOpenCalendarDialog = () => {
        this.setState({isCalendarDialogOpen: true})
    }
    handleOpenTimeSelectDialog = () => this.setState({isTimeSelectDialogOpen: true})

    handleCloseTimeSelectDialog = () => this.setState({isTimeSelectDialogOpen: false})

    handleOpenSubmitDialog = () => this.setState({isSubmitDialogOpened: true})

    handleCloseSubmitDialog = key => {
        switch(key){
            case STATUS_SUBMIT_SUCCESS: {
                this.setState({isSubmitDialogOpened: false})
                this.props.clearReservation()
                this.props.history.push('/reservations')
                break
            }
            default: {
                this.setState({isSubmitDialogOpened: false})
            }
        }
    }

    handleSelectTable = tableId => {
        if(this.props.reservation.tables.includes(tableId)){
            this.props.removeTable(tableId)
        } else {
            this.props.addTable(tableId)
        }
    }
    handleNextStep = () => {
        this.setState(prevState => ({
          activeStep: prevState.activeStep + 1,
        }));
      };
    
      handlePrevStep = () => {
        this.setState(prevState => ({
          activeStep: prevState.activeStep - 1,
        }));
    };
    handleContactInfo = (values, actions) => {
        actions.setSubmitting(false)
        this.handleNextStep()
        this.setState({
            email: values.email,
            description: values.description
        })
        this.props.setContactInfo(values.email, values.description)

    }
    handleSubmitReservation = () => {
        this.reCaptchaRef.current.execute();
        this.setState({
            selectedDateTime: undefined,
            isSubmitDialogOpened: true
        })
        const {tables, date, ownerEmail, description, seats} = this.props.reservation;
        this.props.postReservationStart(tables, seats, date, ownerEmail, description);
        
    }
    canProceed = step => {
        switch(step){
            case 0: return this.props.reservation.date !== undefined
            case 1: return this.props.reservation.ownerEmail
            default: return false
        }
    }
    canSubmitReservation = (seats, email, date) => {
        return seats > 0 && email !== '' && email !== undefined && date !== undefined
    }
    render(){
        const {activeStep} = this.state
        const {seats, ownerEmail, description, date} = this.props.reservation
        const captchaEl = (
            <ReCAPTCHA
                ref={this.reCaptchaRef} 
                size="invisible"
                sitekey={'6LcwUIcUAAAAACnSQfe1L6ZKUD56VO_zMq3CGXRV'}
            />
        )
        let step = null
        let stepHeaderText = null
        switch(activeStep){
            case 0: {
                step =  (<PosedReservationControls
                    key={'date-step'}
                    handleOpenCalendarDialog={this.handleOpenCalendarDialog}
                    handleCloseCalendarDialog={this.handleCloseCalendarDialog}
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
                    />)
                    stepHeaderText = I18n.get('ReservationsPage-date-step-header')
                    break
            }
            case 1: {
                step = (<PosedReservationContactForm 
                    key={'contact-form'}
                    email={this.state.email}
                    description={this.state.description}
                    handleContactInfo={this.handleContactInfo}
                    /> )
                stepHeaderText = I18n.get('ReservationsPage-contact-step-header')
                break
            } 
            case 2: {
                step = (<PosedReservationSummary 
                    key={'summary'}
                    seats={seats}
                    email={ownerEmail}
                    description={description}
                    date={format(date, 'HH:mm d/MM/YYYY', {awareOfUnicodeTokens: true})}
                    canSubmitReservation={() => this.canSubmitReservation(seats, ownerEmail, date)}
                    handleSubmitReservation={this.handleSubmitReservation}
                    handleOpenSubmitDialog={this.handleOpenSubmitDialog}
                    handleCloseSubmitDialog={this.handleCloseSubmitDialog}
                    submitStatus={this.props.reservationPostStatus}
                    isDialogOpen={this.state.isSubmitDialogOpened}
                    />)
                stepHeaderText = I18n.get('ReservationsPage-summary-step-header')
                break
            }
            default: step = null
        }
        let restaurantView = (<RestaurantView
            handleSelectTable={this.handleSelectTable}
            allTables={this.props.tables}
            tablesSelected={this.props.reservation.tables}
            tablesReserved={this.props.loadedReservations.tables}
        />)
        if(!date){
            restaurantView = <NoTimeRestaurantView />
        }
        return ( <Grid container justify={'center'}>
            <Grid item lg={8} className={styles.ReservationControlsContainer}>
                <Card className={styles.CardContent}>
                    <CardContent>
                        <MobileStepper
                        steps={3}
                        position={'static'}
                        className={styles.Stepper}
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={this.handleNextStep} disabled={!this.canProceed(activeStep)}>
                            {I18n.get('ReservationsPage-form-next-btn')}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={this.handlePrevStep} disabled={this.state.activeStep === 0}>
                            {I18n.get('ReservationsPage-form-back-btn')}
                            </Button>
                        }
                        />
                        <div className={styles.StepHeaderWrapper}>
                        <Typography variant={'h6'} className={styles.StepHeader}>{stepHeaderText}</Typography>
                        </div>
                        {captchaEl} 
                        <PoseGroup>
                            {step}
                        </PoseGroup>
                    </CardContent>    
                </Card>
                <div className={styles.RestaurantViewContainer}>
                    {restaurantView}    
                </div> 
                
                    
            </Grid>
            
        </Grid> )
    }
}
const mapStateToProps = state =>{
    return {
        tables: state.tables,
        reservation: state.currentReservation,
        openHours: state.openHours,
        reservationPostStatus: state.reservationPostStatus,
        loadedReservations: state.loadedReservations
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTable: tableId => dispatch(creators.addTableToReservation(tableId)),
        removeTable: tableId => dispatch(creators.removeTableFromReservation(tableId)),
        setDateTime: dateTime => dispatch(creators.setReservationDate(dateTime)),
        setContactInfo: (email, description) => dispatch(creators.setReservationOwnerEmail(email, description)),
        postReservationStart: (tables, seats, date, email, description) => dispatch(creators.postReservationEpic(tables, seats, date, email, description)),
        clearReservation: () => dispatch(creators.clearReservation()),
        loadReservations: dateTime => dispatch(creators.loadReservationsStart(dateTime)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage)