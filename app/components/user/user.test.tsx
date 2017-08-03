import * as React from "react"
import { UserComponent } from "./user"
import { profileStartup } from "../../../store/reducers"
import { MUIProvider } from "../../../shared/components/MUIProvider"

test("Render a User", () => {
    const component = render(
        <MUIProvider>
            <UserComponent
                profiles={{ 123: profileStartup }}
                size={{ width: 300, height: 600 }}
                profile={profileStartup}
            />
        </MUIProvider>
    )
    expect(component).toMatchSnapshot()
})
