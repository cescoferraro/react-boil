import * as React from "react"
import { Item } from "./item"
import { MUIProvider } from "../../../../shared/components/MUIProvider"
import GpsFixed from "material-ui-icons/GpsFixed.js"

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
