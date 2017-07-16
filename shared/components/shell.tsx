import * as React from "react"
import AppBar from 'material-ui/AppBar'

export const Shell = ({ children, id, css = "" }) => {
    return (
        <div  >
            <AppBar title="React-Boil" />
            <div id={id} className={css}>
                {children}
            </div>
        </div>
    )
}
