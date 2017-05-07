import { reactReduxFirebase, firebaseStateReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

function todos(state = [], action) {

    switch (action.type) {
        case 'TODO':
            return state.concat([action.text])
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}
export let allReducers = combineReducers({
    todos: todos,
    firebase: firebaseStateReducer
})
