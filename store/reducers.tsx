import { firebaseStateReducer } from "react-redux-firebase"
import { combineReducers } from "redux"



import { NOT_FOUND } from 'redux-first-router'
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

export let allReducers = (location) => combineReducers({
    location,
    userId: userIdReducer,
    firebase: firebaseStateReducer
})
