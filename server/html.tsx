import * as React from "react"
const type = "text/javascript";
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import { StaticRouter } from "react-router-dom";
import * as serialize from 'serialize-javascript'

export const HTML = ({ asyncState, production, css, appString, store, title }) => {
    const hey = "window.ASYNC_COMPONENTS_STATE = " + serialize(asyncState)
    return (<html>
        <head>
            <link rel="shortcut icon" href="icons/favicon.ico" />
            <style type="text/css">{css.join('  ')}</style>
            <title>{title}</title>
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: appString }} />
            {production ? null : <script type={type} async src="/dll/vendor.js"></script>}
            <script type={type} dangerouslySetInnerHTML={{ __html: hey }} />
            <script type={type} async src="/client.js"></script>
        </body>
    </html>)
}
