import * as React from "react"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { BoilTheme } from "../../theme"

export const MUIProvider = ({ children }) => (
    <MuiThemeProvider muiTheme={getMuiTheme(BoilTheme)}>
        {children}
    </MuiThemeProvider>
)
