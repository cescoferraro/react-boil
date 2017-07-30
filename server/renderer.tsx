import * as React from "react"
import { renderToString } from "react-dom/server"
import { AppRouter } from "../app/router"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { Provider as ReduxProvider } from "react-redux"
import { BoilTheme } from "../shared/theme"

export const Renderer = (req, store) => {
    const app = (
        <MuiThemeProvider muiTheme={getMuiTheme(BoilTheme, { userAgent: req.headers["user-agent"] })}>
            <ReduxProvider store={store}>
                <AppRouter />
            </ReduxProvider>
        </MuiThemeProvider >
    )
    return { app, string: renderToString(app) }
}
