import reducer from './reservationReducer'
import * as creators from '../actions/actionCreators'

describe('reservations reducer', () => {
    it(`should set current reservation's date`, () => {
        const currentDate = Date.now();
        const action = creators.setReservationDate(currentDate);

        expect(reducer({}, action)).toEqual({
            currentReservation: {
                date: currentDate
            }
        })
    })
    it(`should set owner email`, () => {
        const email = 'test@test.com'
        const action = creators.setReservationOwnerEmail(email)

        expect(reducer({}, action)).toEqual({
            currentReservation: {
                ownerEmail: email
            }
        })
    })
    it(`shoukd add table to reservation and update seats reserved`, () => {
        const tableId = 9
        const action = creators.addTableToReservation(tableId)
        expect(reducer({
            tables: [{id: 9, seats: 1}],
            currentReservation: {
                tables: [],
                seats: 0
            }
        }, action).currentReservation).toEqual({
                tables: [tableId],
                seats: 1
        })
    })
    it(`should remove table from reservation and update seats reserved`, () => {
        const table = {id: 9, seats: 5}
        const table2 = {id: 7, seats: 7}
        const action = creators.removeTableFromReservation(table.id)
        expect(reducer({
            tables: [table,  table2],
            currentReservation: {
                tables: [table.id, table2.id],
                seats: table.seats + table2.seats
            }
        }, action).currentReservation).toEqual({
            tables: [table2.id],
            seats:  table2.seats
        })
    })
})