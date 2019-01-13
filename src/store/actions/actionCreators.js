import * as actypes from './actionTypes'
//import {STATUS_SUBMIT_IDLE, STATUS_SUBMIT_PENDING, STATUS_SUBMIT_SUCCESS, STATUS_SUBMIT_FAIL} from '../reducers/reservationReducer'

export const  setReservationDate = date => {
    return {
        type: actypes.SET_RESERVATION_DATE,
        date: date
    }
}
export const setReservationOwnerEmail = (email, description) => {
    return {
        type: actypes.SET_RESERVATION_OWNER_EMAIL,
        ownerEmail: email,
        description: description
    }
}
export const addTableToReservation = tableId => {
    return {
        type: actypes.ADD_TABLE_TO_RESERVATION,
        tableId: tableId
    }
}
export const removeTableFromReservation = tableId => {
    return {
        type: actypes.REMOVE_TABLE_FROM_RESERVATION,
        tableId: tableId
    }
}
export const postReservationEpic = (tables, seats, date, email, description) => {
    return {
        type: actypes.POST_RESERVATION_EPIC,
        tables: tables,
        seats: seats,
        date: date,
        email: email,
        description: description
    }
}
export const postReservationSuccess = () => {
    return {
        type: actypes.POST_RESERVATION_SUCCESS,
    }
}
export const postReservationFail = error => {
    return {
        type: actypes.POST_RESERVATION_FAIL,
        error: error
    }
}
export const setReservationSubmitStatus = (key, message) => {
    return {
        type: actypes.SET_RESERVATION_SUBMIT_STATUS,
        key: key,
        message: message
    }
}
export const clearReservation = () => {
    return {
        type: actypes/actypes.CLEAR_RESERVATION
    }
}
export const loadReservationsStart = date => {
    return {
        type: actypes.LOAD_RESERVATIONS_START,
        date: date
    }
}
export const loadReservationsResponse = response => {
    return {
        type: actypes.LOAD_RESERVATIONS_RESPONSE,
        tables: response.tables
    }
}