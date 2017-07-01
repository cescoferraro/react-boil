import * as React from "react"
const type = "text/javascript";
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { StaticRouter } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { getFirebase } from 'react-redux-firebase';

export const Renderer = (req, store) => {
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
    return {
        string: renderToString(app),
        css: css
    }
}
