import {determineSelectHours} from './OpenHoursSelect'

describe('OpenHoursSelect.determineSelectHours', () => {
    it('should return  correct times', () => {
        const conditions = [
            {openHours: '07:00', endHours: '21:00', offsetTime: 2, isToday: true, nowDate: new Date(2019, 0, 1, 13, 0), selectedDate: new Date(2019, 0, 1),
            expStartHours: 15, expStartMin: 0, expEndMin: 30, expEndHours: 20},
            {openHours: '09:00', endHours: '23:30', offsetTime: 3, isToday: true, nowDate: new Date(2019, 0, 1, 17, 0), selectedDate: new Date(2019, 0, 1),
            expStartHours: 20, expStartMin: 0, expEndHours: 23, expEndMin: 0},
            {openHours: '09:00', endHours: '23:30', offsetTime: 3, isToday: true, nowDate: new Date(2019, 0, 1, 18, 0), selectedDate: new Date(2019, 0, 1),
            expStartHours: 21, expStartMin: 0, expEndHours: 23, expEndMin: 0},
            {openHours: '09:00', endHours: '23:30', offsetTime: 3, isToday: true, nowDate: new Date(2019, 0, 1, 20, 0), selectedDate: new Date(2019, 0, 1),
            expStartHours: 23, expStartMin: 0, expEndHours: 23, expEndMin: 0},
            {openHours: '09:00', endHours: '23:30', offsetTime: 3, isToday: false, nowDate: new Date(2019, 0, 1, 20, 0), selectedDate: new Date(2019, 0, 2),
            expStartHours: 9, expStartMin: 0, expEndHours: 23, expEndMin: 0}
        ]
        conditions.forEach(cond => {
            const {start, end} = determineSelectHours(cond.openHours, cond.endHours, cond.offsetTime, cond.isToday, cond.nowDate, cond.selectedDate)
            expect(start.getHours()).toEqual(cond.expStartHours)
            expect(end.getHours()).toEqual(cond.expEndHours)

            expect(start.getMinutes()).toEqual(cond.expStartMin)
            expect(end.getMinutes()).toEqual(cond.expEndMin)
        })
    })
})