import * as React from "react"
import { NoMatchContainer } from "./404"
import { profileStartup } from "../../../store/reducers"
import { MUIProvider } from "../../../shared/components/MUIProvider"

describe("<NoMatchContainer />", () => {
    it('404', () => {
        const component = mount(
            <MUIProvider>
                <NoMatchContainer />
            </MUIProvider>
        )
        expect(component.text()).toContain('NOT FOUND!');
        expect(component).toMatchSnapshot()
    })
})
