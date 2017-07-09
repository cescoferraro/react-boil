import * as React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { UniversalComponent } from "./components/universal"
import { MyHelmet } from "../shared/helmet"
import Link from 'redux-first-router-link'
import { compose } from "recompose"
import AppBar from 'material-ui/AppBar'
import * as CSS from "./css/base/base.pcss"

const Shell = ({ children, id }) => {
    return (
        <div id={id} >
            <AppBar
                className={CSS.trigger}
                title="React-Boil"
            />
            {children}
        </div>
    )
}

const AppRouterClass = (props) => {
    switch (props.location.type) {
        case "HOME":
        case "INDEX":
            return (
                <Shell id="HOME">
                    <h2> {props.location.type} </h2>
                    <MyHelmet title="Home" />
                    <h2>React-boil</h2>
                    <Link to="/user/123">User 123</Link>
                    <Link to={{ type: 'USER', payload: { id: 456 } }}>User 456</Link>
                </Shell>
            )
        case "USER":
            return (
                <Shell id="USER">
                    <h2>{props.location.type}</h2>
                    <h2>{props.userId}</h2>
                    <UniversalComponent />
                    <RaisedButton
                        onClick={() => { props.dispatch({ type: "PING" }) }}
                        label="Default"
                    />
                </Shell>
            )
        default:
            return <h2>default</h2>
    }
}

export const AppRouter = compose(connect(({ location, userId }) => ({ location, userId })))(AppRouterClass)
