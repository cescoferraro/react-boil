import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { HTML } from "./html";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import { Renderer } from "./renderer";
import createHistory from 'history/createMemoryHistory'
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
injectTapEventPlugin();

export default function serverRenderer(props) {
    const context = {};
    return (req, res, next) => {
        let store = configureStore(createHistory({ initialEntries: [req.path] }));
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
