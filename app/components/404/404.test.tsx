import * as React from "react"
import { NoMatchContainer } from "./404"
import { profileStartup } from "../../../store/reducers"
import { MUIProvider } from "../../../shared/components/MUIProvider"
import * as renderer from 'react-test-renderer';
import { MuiThemeProvider } from 'material-ui/styles';
import { theme } from "../../../shared/theme/index";




describe("<NoMatchContainer />", () => {
    it('404', () => {
        const component = renderer.create(
            <MuiThemeProvider theme={theme}>
                <NoMatchContainer />
            </MuiThemeProvider>
        )
        expect(component).toMatchSnapshot()
    })
})
