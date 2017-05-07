import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { App } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import { HTML } from "./html";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
declare let global: any;
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
import { dataToJS, watchEvent, actionTypes } from 'react-redux-firebase'
import { getFirebase } from 'react-redux-firebase';

injectTapEventPlugin();

export default function serverRenderer({ clientStats, serverStats, foo }) {
    let css = new Array();
    let store = configureStore();
    let initial = store.getState()
    return (req, res, next) => {
        console.log(actionTypes)
        let userAgent = req.headers['user-agent'];
        let container = (
            <WithStylesContext onInsertCss={styles => { css.push(styles._getCss()) }}>
                <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: userAgent })}>
                    <ReduxProvider store={store}>
                        <App />
                    </ReduxProvider>
                </MuiThemeProvider>
            </WithStylesContext>
        )
        /* console.warn(initial.firebase)*/
        /* store.dispatch({ type: actionTypes.START })*/
        /* store.subscribe((ej) => {*/
        /* console.log("receiving store data!")*/
        /* console.log(store.getState().firebase);*/
        /* });*/
        res.send("<!DOCTYPE html>" +
            renderToStaticMarkup(
                <HTML css={css} foo={foo} app={container} />
            ))
    };
}
