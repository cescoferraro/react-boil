import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { HTML } from "./html";
import { PostCSSProvider } from "../shared/components/styles.context";
import { MaterialUI } from "../shared/components/materialui";
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import *  as injectTapEventPlugin from "react-tap-event-plugin";

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
injectTapEventPlugin();

export default function serverRenderer({ production, clientStats, serverStats, title }) {
    const context = {};
    return async (req, res, next) => {
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

