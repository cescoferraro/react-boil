import * as React from "react"
import * as CSS from "./css/home.css"
const test = require("../../../README.org")

export const HomeComponent = ({ }) => {
    return <div className={CSS.container} dangerouslySetInnerHTML={{ __html: test }} />
}
