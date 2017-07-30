import * as React from "react"
import { MyHelmet } from "../../../shared/helmet"
import * as CSS from "./css/home.css"
import { Shell } from "../../../shared/components/shell"
const test = require("../../../README.org")

export const HomeContainer = (props) => {
    return (
        <Shell {...props}>
            <MyHelmet title="Home" />
            <div className={CSS.container} dangerouslySetInnerHTML={{ __html: test }} />
        </Shell>
    )
}
