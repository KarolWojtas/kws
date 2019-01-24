import {SET_LANGUAGE} from '../actions/actionTypes'

const INIT_STATE = {
    lang: 'pl'
}
const settingsReducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case SET_LANGUAGE: return setLanguage(state, action);
        default: return state
    }
}
const setLanguage = (state, action) => {
    return {
        ...state,
        lang: action.lang
    }
}
export default settingsReducer