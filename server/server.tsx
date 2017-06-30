import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import { HTML } from "./html";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import { StaticRouter } from "react-router-dom";
import { dataToJS, actionTypes } from 'react-redux-firebase'
import { getFirebase } from 'react-redux-firebase';

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
injectTapEventPlugin();

export default function serverRenderer({ production, clientStats, serverStats, title }) {
    const context = {};
    return (req, res, next) => {
        let store = configureStore();
        var css = []

        let app = (
            <WithStylesContext onInsertCss={styles => { css.push(styles._getCss()) }}>
                <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: req.headers['user-agent'] })}>
                    <StaticRouter location={req.url} context={{}}>
                        <ReduxProvider store={store}>
                            <AppRouter />
                        </ReduxProvider>
                    </StaticRouter>
                </MuiThemeProvider>
            </WithStylesContext>
        )
        const appString = renderToString(app)
        res.send("<!DOCTYPE html>" +
            renderToStaticMarkup(
                <HTML title={title}
                    css={css}
                    appString={appString}
                    production={production}
                    store={store}
                    clientStats={clientStats}
                    serverStats={serverStats}
                />
            ))

    };
}
