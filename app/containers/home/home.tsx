import * as React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { UniversalComponent } from "../../components/universal"
import { MyHelmet } from "../../../shared/helmet"
import Link from 'redux-first-router-link'
import AppBar from 'material-ui/AppBar'
import * as CSS from "../../css/base/base.css"
import { Shell } from "../../../shared/components/shell"
const ImageSrc = require("../../../shared/images/boil.jpg")

export const HomeContainer = (props) => (
    <Shell id="HOME">
        <h2>{props.location.type}</h2>
        <MyHelmet title="Home" />
        <h2>React-boil</h2>
        <img alt="" src={ImageSrc} />
        <Link to="/user/123">User 123</Link>
        <Link to={{ type: 'USER', payload: { id: 456 } }}>User 456</Link>
    </Shell>
)
