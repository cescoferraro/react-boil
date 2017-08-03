import * as React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

/* import getMuiTheme from "material-ui/styles/getMuiTheme"*/
/* import { BoilTheme } from "../../theme"*/
/* <MuiThemeProvider muiTheme={getMuiTheme(BoilTheme)}> */

export const MUIProvider = ({ children }) => (
    < MuiThemeProvider >
        {children}
    </MuiThemeProvider >
)
