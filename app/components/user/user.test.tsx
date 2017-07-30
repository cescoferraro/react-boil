import * as React from "react"
import * as renderer from "react-test-renderer"
import GpsFixed from "material-ui/svg-icons/device/gps-fixed"
import { BoilTheme } from "../../../shared/theme"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { UserComponent } from "./user"
import { profileStartup } from "../../../store/reducers"

test("Render a User", () => {
    const icon = (<GpsFixed style={{ fill: "grey" }} />)
    const component = renderer.create(
        <MuiThemeProvider muiTheme={getMuiTheme(BoilTheme)}>
            <UserComponent
                profiles={{ 123: profileStartup }}
                size={{ width: 300, height: 600 }}
                profile={profileStartup} />
        </MuiThemeProvider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
