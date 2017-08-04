import * as React from "react"
import Country from "./country"
import * as renderer from 'react-test-renderer';
import { MuiThemeProvider } from 'material-ui/styles';
import { theme } from "../../../../shared/theme/index";
test("Render an Item", () => {
    const component = renderer.create(
        <MuiThemeProvider theme={theme}>
            <Country
                profile={{ nat: "BR" }}
                className="coolClassName"
            />
        </MuiThemeProvider>
    )
    expect(component).toMatchSnapshot()
})
