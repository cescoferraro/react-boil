import { connectRoutes } from 'redux-first-router'
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { RootEpic } from "./epics"
import { allReducers } from "./reducers"
import { logger } from "./logger";
import { routesMap } from "../app/route.map";
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import * as reducers from './reducers';
export const engine = createEngine('my-save-key');
let ReplacebleEpicMiddleware = createEpicMiddleware(RootEpic);

export const configureStore = (history: any = {}) => {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap) // yes, 3 redux aspects
    const rootReducer = allReducers(reducer)
    const reducerXXX = storage.reducer(rootReducer);
    const middlewareXXX = storage.createMiddleware(engine, ["HOME", "USER"]);
    let middlewares = composeWithDevTools(
        applyMiddleware(middleware,
            middlewareXXX,
            logger,
            ReplacebleEpicMiddleware
        )
    )
    const createStoreWithMiddleware = applyMiddleware(middlewareXXX)(createStore);
    const store = createStoreWithMiddleware(reducerXXX, compose(enhancer, middlewares))



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
