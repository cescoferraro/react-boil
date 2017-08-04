import * as React from "react"
import UserComponent from "./user"
import { profileStartup } from "../../../store/reducers"

import { MuiThemeProvider } from 'material-ui/styles';
import * as renderer from 'react-test-renderer';
import { theme } from "../../../shared/theme/index";


test("Render a User", () => {
    const component = renderer.create(
        <MuiThemeProvider theme={theme}>
            <UserComponent
                profiles={{ 123: profileStartup }}
                size={{ width: 300, height: 600 }}
                profile={profileStartup}
            />
        </MuiThemeProvider>
    )
    expect(component).toMatchSnapshot()
})
