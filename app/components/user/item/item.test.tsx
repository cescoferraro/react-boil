import * as React from "react"
import { Item } from "./item"
import * as renderer from "react-test-renderer"
import GpsFixed from "material-ui/svg-icons/device/gps-fixed"
import { BoilTheme } from "../../../../shared/theme"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

test("Render an Item", () => {
    const icon = (
        <GpsFixed
            style={{ fill: "grey" }}
        />
    )
    const component = renderer.create(
        <MuiThemeProvider muiTheme={getMuiTheme(BoilTheme)}>
            <Item
                title="Email"
                value={"teste@example.com"}
                icon={icon}
            />
        </MuiThemeProvider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
