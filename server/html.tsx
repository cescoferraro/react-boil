import * as React from "react"
const type = "text/javascript";
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { Router } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import { StaticRouter } from "react-router-dom";


export const HTML = ({ userAgent, url, store, foo }) => {
    var css = []
    let container = renderToString(
        <WithStylesContext onInsertCss={styles => { css.push(styles._getCss()) }}>
            <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: userAgent })}>
                <StaticRouter location={url} context={{}}>
                    <ReduxProvider store={store}>
                        <Router />
                    </ReduxProvider>
                </StaticRouter>
            </MuiThemeProvider>
        </WithStylesContext>
    )
    console.log(css)
    return (<html>
        <head>
            <link rel="shortcut icon" href="icons/favicon.ico" />
            <style type="text/css">{css.join('  ')}</style>
            <title>{foo}</title>
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: container }} />
            <script type={type} async src="/client.js"></script>
        </body>
    </html>)
}
