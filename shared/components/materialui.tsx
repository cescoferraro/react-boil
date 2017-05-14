import * as React from "react"
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export const MaterialUI = ({ userAgent, children }) => (
    <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: userAgent })} >
        {children}
    </MuiThemeProvider>

)
