import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { Router } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import { HTML } from "./html";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import { StaticRouter } from "react-router-dom";
import { dataToJS, watchEvent, actionTypes } from 'react-redux-firebase'
import { getFirebase } from 'react-redux-firebase';


global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
injectTapEventPlugin();

export default function serverRenderer({ production,
    clientStats,
    serverStats,
    title }) {
    const context = {};
    return (req, res, next) => {
        console.log(production)
        let store = configureStore();
        res.send("<!DOCTYPE html>" +
            renderToStaticMarkup(
                <HTML title={title}
                    production={production}
                    userAgent={req.headers['user-agent']}
                    url={req.url} store={store}
                />
            ))
    };
}
