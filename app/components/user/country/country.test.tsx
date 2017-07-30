import * as React from "react"
import Country from "./country"
import GpsFixed from "material-ui/svg-icons/device/gps-fixed"
import { MUIProvider } from "../../../../shared/components/MUIProvider"


test("Render an Item", () => {
    const component = render(
        <MUIProvider>
            <Country
                profile={{ nat: "BR" }}
                className="coolClassName"
            />
        </MUIProvider>
    )
    expect(component).toMatchSnapshot()
})
