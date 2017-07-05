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
import { NOT_FOUND } from 'redux-first-router'
import { logger } from "./logger";
import { routesMap } from "../app/route.map";

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
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCR1eRcu-FHxG6Yp1RarrBq1wKWWi8Ha2k",
    authDomain: "craigs-8e724.firebaseapp.com",
    databaseURL: "https://craigs-8e724.firebaseio.com",
    projectId: "craigs-8e724",
    storageBucket: "craigs-8e724.appspot.com",
    enableRedirectHandling: false,
    messagingSenderId: "794041684762"
};

export const configureStore = (history: any = {}) => {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap) // yes, 3 redux aspects
    const rootReducer = allReducers(reducer)

    let middlewares = composeWithDevTools(
        applyMiddleware(middleware,
            logger,
            ReplacebleEpicMiddleware)
    )
    let FirebaseStoreCreator = compose(reactReduxFirebase(FIREBASE_CONFIG, {}))(createStore);
    const store = FirebaseStoreCreator(rootReducer, compose(enhancer, middlewares))



    if (module.hot) {
        module.hot.accept(['./reducers.tsx'], () => {
            const nextRootReducer = require('./reducers.tsx').allReducers(reducer);
            store.replaceReducer(nextRootReducer);
        });
        module.hot.accept(["./epics.tsx"], () => {
            const nextRootEpic = require('./epics.tsx').RootEpic;
            ReplacebleEpicMiddleware.replaceEpic(nextRootEpic);
        });
    }
    return store
}
