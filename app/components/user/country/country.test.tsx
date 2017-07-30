import * as React from "react"
import Country from "./country"
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
