import * as actypes from '../actions/actionTypes'
import { postReservationResetStatus } from '../actions/actionCreators';

const emptyReservation = {
    tables: [],
    seats: 0,
    date: undefined,
    ownerEmail: undefined,
    description: undefined,
    created: undefined
}
export const STATUS_SUBMIT_IDLE = 'idle'
export const STATUS_SUBMIT_PENDING = 'pending'
export const STATUS_SUBMIT_SUCCESS = 'success'
export const STATUS_SUBMIT_FAIL = 'fail'

const INITIAL_STATE= {
    tables: [
        {id: 1, seats: 2},
        {id: 2, seats: 2},
        {id: 3, seats: 2},
        {id: 4, seats: 2},
        {id: 5, seats: 1},
        {id: 6, seats: 1},
        {id: 7, seats: 1},
        {id: 8, seats: 1},
        {id: 9, seats: 1},
        {id: 10, seats: 1},
        {id: 11, seats: 1},
    ],
    openHours: [
        {open: '09:00', close: '21:00'},
        {open: '07:00', close: '22:00'},
        {open: '07:00', close: '22:00'},
        {open: '07:00', close: '22:00'},
        {open: '07:00', close: '22:00'},
        {open: '07:00', close: '23:45'},
        {open: '09:00', close: '23:45'},
        
    ],
    reservationOffset: 3,
    loadedReservations: {
        tables: []
    },
    reservationPostStatus: {
        key: STATUS_SUBMIT_IDLE,
        message: 'idle'
    },
    currentReservation: {
        ...emptyReservation
    }
}

const reservationReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case actypes.SET_RESERVATION_DATE: return setCurrentReservationDate(state, action)
        case actypes.SET_RESERVATION_OWNER_EMAIL: return setCurrentReservationOwnerEmailAndDesc(state, action)
        case actypes.ADD_TABLE_TO_RESERVATION: return addTableToReservation(state, action)
        case actypes.REMOVE_TABLE_FROM_RESERVATION: return removeTableFromReservation(state, action)
        case actypes.CLEAR_RESERVATION: return clearReservation(state, action)
        case actypes.POST_RESERVATION_SUCCESS: return postReservationSuccess(state, action)
        case actypes.POST_RESERVATION_FAIL: return postReservationFail(state, action)
        case actypes.SET_RESERVATION_SUBMIT_STATUS: return setReservtionSubmitStatus(state, action)
        case actypes.LOAD_RESERVATIONS_RESPONSE: return loadReservationsResponse(state, action)
        default: return state
    }
}
const setCurrentReservationDate = (state, action) => {
    return {
        ...state,
        currentReservation: {
            ...state.currentReservation,
            date: action.date
        }
    }
}
const setCurrentReservationOwnerEmailAndDesc = (state, action) => {
    return {
        ...state,
        currentReservation: {
            ...state.currentReservation,
            ownerEmail: action.ownerEmail,
            description: action.description
        }
    }
}
const addTableToReservation = (state, action) => {
    const updatedTables = [...state.currentReservation.tables, 
        state.tables.filter(table => table.id === action.tableId).map(table => table.id)[0]]
    return {
        ...state,
        currentReservation: {
            ...state.currentReservation,
            tables: updatedTables,
            seats: state.currentReservation.seats + state.tables.find(table => table.id === action.tableId).seats
        }
    }
}
const removeTableFromReservation = (state, action) => {
    const updatedTables = state.currentReservation.tables.filter(table => table !== action.tableId)
    return {
        ...state,
        currentReservation: {
            ...state.currentReservation,
            tables: updatedTables,
            seats: state.currentReservation.seats - state.tables.find(table => table.id === action.tableId).seats
        }
    }
}
const clearReservation = (state, action) => {
    return {
        ...state,
        currentReservation: {
            ...emptyReservation
        }
    }
}
const postReservationSuccess = (state, action) => {
    return {
        ...state,
        reservationPostStatus: {
            key: STATUS_SUBMIT_SUCCESS,
            message: 'SubmitDialog-submit-success'
        }
    }
}
const postReservationFail = (state, action) => {
    return {
        ...state,
        reservationPostStatus: {
            key: STATUS_SUBMIT_FAIL,
            message: action.error
        }
    }
}
const setReservtionSubmitStatus = (state, action) => {
    return {
        ...state,
        reservationPostStatus: {
            key: action.key,
            message: action.message
        }
    }
}
const loadReservationsResponse =(state, action) => {
    return {
        ...state,
        currentReservation: {
            ...state.currentReservation,
            tables: [],
            seats: 0,
        },
        loadedReservations: {
            tables: action.tables
        },
    }
}


export default reservationReducer
