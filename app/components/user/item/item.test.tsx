import * as React from "react"
import { Item } from "./item"

import GpsFixed from "material-ui-icons/GpsFixed.js"

import { MuiThemeProvider } from 'material-ui/styles';
import { theme } from "../../../../shared/theme/index";

import * as renderer from 'react-test-renderer';
test("Render an Item", () => {
    const icon = (<GpsFixed style={{ fill: "grey" }} />)
    const component = renderer.create(
        <MuiThemeProvider theme={theme}>
            <Item
                title="Email"
                value={"teste@example.com"}
                icon={icon}
            />
        </MuiThemeProvider>
    )
    expect(component).toMatchSnapshot()
})
