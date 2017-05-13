import { reactReduxFirebase, firebaseStateReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { todos } from "./todos";

export let allReducers = combineReducers({
    todos: todos,
    firebase: firebaseStateReducer
})
