import * as actypes from './actionTypes'

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
