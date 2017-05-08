import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, firebaseStateReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { RootEpic } from "./epics";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { allReducers } from "./reducers";
import { createLogger } from 'redux-logger'
import { logger } from "./logger";


export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCR1eRcu-FHxG6Yp1RarrBq1wKWWi8Ha2k",
    authDomain: "craigs-8e724.firebaseapp.com",
    databaseURL: "https://craigs-8e724.firebaseio.com",
    projectId: "craigs-8e724",
    storageBucket: "craigs-8e724.appspot.com",
    enableRedirectHandling: false,
    messagingSenderId: "794041684762"
};

let ReplacebleEpicMiddleware = createEpicMiddleware(RootEpic);

export const configureStore = (history: any = {}) => {
    let startup = { todos: ['Use Redux'] }
    let FirebaseStoreCreator = compose(reactReduxFirebase(FIREBASE_CONFIG))(createStore);
    let composeEnhancers = composeWithDevTools(
        applyMiddleware(routerMiddleware(history),
            logger,
            ReplacebleEpicMiddleware)
    )
    let store = FirebaseStoreCreator(
        connectRouter(history)(allReducers),
        startup, composeEnhancers)

    if (module.hot) {
        module.hot.accept(['./reducers.tsx'], () => {
            const nextRootReducer = require('./reducers.tsx').allReducers;
            store.replaceReducer(nextRootReducer);
        });
        module.hot.accept(["./epics.tsx"], () => {
            const nextRootEpic = require('./epics.tsx').RootEpic;
            ReplacebleEpicMiddleware.replaceEpic(nextRootEpic);
        });
    }

    return store
}
