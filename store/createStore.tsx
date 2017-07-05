import { connectRoutes } from 'redux-first-router'
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { reactReduxFirebase, firebaseStateReducer } from "react-redux-firebase"
import { combineReducers } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { RootEpic } from "./epics"
import { allReducers } from "./reducers"

function todos(state = [], action) {

    switch (action.type) {
        case "TODO":
            return state.concat([action.text])
        case "ADD_TODO":
            return state.concat([action.text])
        default:
            return state
    }
}
const routesMap = {
    HOME: "/",
    USER: "/user/:id"
}
import { NOT_FOUND } from 'redux-first-router'
import { logger } from "./logger";

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

let ReplacebleEpicMiddleware = createEpicMiddleware(RootEpic);

export const configureStore = (history: any = {}) => {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap) // yes, 3 redux aspects
    const rootReducer = combineReducers({ location: reducer, userId: userIdReducer })

    let middlewares = composeWithDevTools(
        applyMiddleware(middleware,
            logger,
            ReplacebleEpicMiddleware)
    )
    const store = createStore(rootReducer, compose(enhancer, middlewares))
    return store
}
