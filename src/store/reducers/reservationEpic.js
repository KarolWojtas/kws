import {combineEpics} from 'redux-observable'
import {map, pluck, switchMap, catchError, tap} from 'rxjs/operators'
import {of, from, throwError} from 'rxjs'
import * as actypes from '../actions/actionTypes'
import * as creators from '../actions/actionCreators'
import {STATUS_SUBMIT_PENDING} from '../reducers/reservationReducer'
import {format} from 'date-fns'
import {api} from '../../axios/axiosConfig' 

const triggerReservationSubmitPending = action$ => action$.ofType(actypes.POST_RESERVATION_EPIC).pipe(
    map(_ => creators.setReservationSubmitStatus(STATUS_SUBMIT_PENDING, 'SubmitDialog-submit-pending'))
)
const postReservation = action$ => action$.ofType(actypes.POST_RESERVATION_EPIC).pipe(
    map(action => ({
        date: action.date.getTime(),
        tables: action.tables,
        email: action.email,
        description: action.description,
        seats: action.seats
    })),
    switchMap(res => from(api.post('/reservations', res))
    .pipe(
        catchError(err => of(creators.postReservationFail(err))),
        tap(res => console.log(res)),
        map(_ => creators.postReservationSuccess())
    ))
)
const loadReservationsStart = action$ => action$.ofType(actypes.LOAD_RESERVATIONS_START).pipe(
    switchMap(action => from(api.get('/tables/'+action.date.getTime())).pipe(
        catchError(err => throwError(new Error(err))),
        pluck('data'),
        map(data => creators.loadReservationsResponse({
            tables: data.tables
        })
    ))
    )
)
const rootEpic = combineEpics(
    triggerReservationSubmitPending,
    postReservation,
    loadReservationsStart
)

export default rootEpic