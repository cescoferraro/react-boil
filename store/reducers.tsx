import { combineReducers } from "redux"
import { reducer as toastrReducer } from 'react-redux-toastr'


import { NOT_FOUND } from 'redux-first-router'
import { DRAWER_ACTION_NAME, DRAWER_TOGGLE_ACTION_NAME } from "./actions";
export const userIdReducer = (state = null, action: any = {}) => {
    switch (action.type) {
        case 'HOME':
        case NOT_FOUND:
            return null
        case 'USER':
            return action.payload.id
        default:
            return state
    }
}

export const drawer = (state = false, action: any = {}) => {
    switch (action.type) {
        case DRAWER_TOGGLE_ACTION_NAME:
            return !state
        case DRAWER_ACTION_NAME:
            return action.payload
        default:
            return state
    }
}

export let allReducers = (location) => combineReducers({
    location,
    toastr: toastrReducer,
    userId: userIdReducer,
    drawer
})
