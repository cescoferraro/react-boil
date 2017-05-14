import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { PostCSSProvider } from "../shared/components/styles.context";
import { HTML } from "./html";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import { StaticRouter } from "react-router-dom";
import { dataToJS, watchEvent, actionTypes } from 'react-redux-firebase'
import { getFirebase } from 'react-redux-firebase';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import { MaterialUI } from "../shared/components/materialui";

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
injectTapEventPlugin();

export default function serverRenderer({ production, clientStats, serverStats, title }) {
    const context = {};
    return (req, res, next) => {
        const asyncContext = createAsyncContext()
        let store = configureStore();
        var css = []
        let app = (
            <PostCSSProvider onInsertCss={styles => { css.push(styles._getCss()) }}>
                <MaterialUI userAgent={req.headers['user-agent']}>
                    <StaticRouter location={req.url} context={{}}>
                        <ReduxProvider store={store}>
                            <AppRouter />
                        </ReduxProvider>
                    </StaticRouter>
                </MaterialUI>
            </PostCSSProvider>
        )
        const appString = renderToString(app)
        res.send("<!DOCTYPE html>" +
            renderToStaticMarkup(
                <HTML title={title}
                    css={css}
                    appString={appString}
                    production={production}
                    store={store} />))
    };
}

