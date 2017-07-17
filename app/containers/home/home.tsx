import * as React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { MyHelmet } from "../../../shared/helmet"
import AppBar from 'material-ui/AppBar'
import * as CSS from "./css/home.css"
import { Shell } from "../../../shared/components/shell"
const ImageSrc = require("../../../shared/images/boil.jpg")
const test = require("../../../internal/webpack/org.js!../../../README.org")

export const HomeContainer = (props) => {
    return (
        <Shell {...props}>
            <MyHelmet title="Home" />
            <div className={CSS.container} dangerouslySetInnerHTML={{ __html: test }} />
        </Shell>
    )
}
