import * as React from "react"
import AppBar from 'material-ui/AppBar'

export const Shell = ({ children, id }) => {
    return (
        <div id={id} >
            <AppBar title="React-Boil" />
            <div id={id}>
                {children}
            </div>
        </div>
    )
}
