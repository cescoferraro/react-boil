import { firebaseStateReducer } from "react-redux-firebase"
import { combineReducers } from "redux"

function todos(state = [], action) {
    switch (action.type) {
        case "TODO":
            return state.concat([action.text])
        case "ADD_TODO":
            console.log("djdjd")
            return state.concat([action.text])
        default:
            return state
    }
}
export let allReducers = (location) => combineReducers({
    location,
    todos,
    firebase: firebaseStateReducer
})
