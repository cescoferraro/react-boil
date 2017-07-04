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
import { Renderer } from "./renderer";

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
injectTapEventPlugin();

export default function serverRenderer(props) {
    const context = {};
    return (req, res, next) => {
        let store = configureStore();
        const render = Renderer(req, store)
        res.send("<!DOCTYPE html>" +
            renderToStaticMarkup(
                <HTML
                    store={store}
                    content={render.string}
                    {...props}
                />
            ))

    };
}
