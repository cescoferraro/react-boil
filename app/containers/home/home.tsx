import * as React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { MyHelmet } from "../../../shared/helmet"
import Link from 'redux-first-router-link'
import AppBar from 'material-ui/AppBar'
import * as CSS from "./css/home.css"
import { Shell } from "../../../shared/components/shell"
const ImageSrc = require("../../../shared/images/boil.jpg")
const test = require("../../../internal/webpack/org.js!../../../README.org")


export const HomeContainer = (props) => {
    return (
        <Shell id="HOME" css={CSS.container}>
            <MyHelmet title="Home" />
            <div dangerouslySetInnerHTML={{ __html: test }} />
            <Link to="/user/123">User 123</Link>
            <Link to={{ type: 'USER', payload: { id: 456 } }}>User 456</Link>
        </Shell>
    )
}
