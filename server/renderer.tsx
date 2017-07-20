import * as React from "react"
const type = "text/javascript";
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { BoilTheme } from "../shared/theme";
const { render } = require("rapscallion");
export const Renderer = (req, store) => {
    let app = (
        <MuiThemeProvider muiTheme={getMuiTheme(BoilTheme, { userAgent: req.headers['user-agent'] })}>
            <ReduxProvider store={store}>
                <AppRouter />
            </ReduxProvider>
        </MuiThemeProvider >
    )
    return { app, string: renderToString(app) }
}
