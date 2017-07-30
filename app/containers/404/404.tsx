import * as React from "react"
import { Shell } from "../../../shared/components/shell"
import { MyHelmet } from "../../../shared/helmet"

export const NoMatchContainer = (props) => {
    return (
        <Shell id="404" {...props}>
            <MyHelmet title="404" />
            <div>
                <h2>NOT FOUND!</h2>
            </div>
        </Shell>
    )
}
