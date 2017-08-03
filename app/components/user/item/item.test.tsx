import * as React from "react"
import { Item } from "./item"
import GpsFixed from "material-ui/svg-icons/device/gps-fixed"
import { MUIProvider } from "../../../../shared/components/MUIProvider"

test("Render an Item", () => {
    const icon = (<GpsFixed style={{ fill: "grey" }} />)
    const component = mount(
        <MUIProvider>
            <Item
                title="Email"
                value={"teste@example.com"}
                icon={icon}
            />
        </MUIProvider>
    )
    expect(component).toMatchSnapshot()
})
