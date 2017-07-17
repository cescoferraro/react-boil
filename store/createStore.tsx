import { connectRoutes } from 'redux-first-router'
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { RootEpic } from "./epics"
import { allReducers } from "./reducers"
import { logger } from "./logger";
import { routesMap } from "../app/route.map";


let ReplacebleEpicMiddleware = createEpicMiddleware(RootEpic);

export const configureStore = (history: any = {}) => {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap) // yes, 3 redux aspects
    const rootReducer = allReducers(reducer)

    let middlewares = composeWithDevTools(
        applyMiddleware(middleware,
            logger,
            ReplacebleEpicMiddleware)
    )
    const store = createStore(rootReducer, compose(enhancer, middlewares))



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
