import * as React from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { UniversalComponent } from "./components/universal"
import { MyHelmet } from "../shared/helmet"
import Link from 'redux-first-router-link'
import { compose } from "recompose"


const AppRouterClass = (props) => {
    switch (props.location.type) {
        case "HOME":
            return <h2>
                {props.location.type}
                jsjsjsj</h2>
        default:
            return (
                <div>
                    {props.location.type}
                    <MyHelmet title="Home" />
                    <h2>React-boil</h2>
                    <UniversalComponent />
                    <Link to="/">User 123</Link>
                    <Link to="/user/123">User 123</Link>
                    <Link to={{ type: 'USER', payload: { id: 456 } }}>User 456</Link>
                    <RaisedButton
                        onClick={() => { props.dispatch({ type: "PING" }) }}
                        label="Default"
                        primary={true}
                    />
                </div >
            )
    }
}

export const AppRouter = compose(
    connect(({ location }) => ({ location }))
)(AppRouterClass)
