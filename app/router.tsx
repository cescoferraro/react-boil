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
            return (
                <div id="HOME">
                    <h2> {props.location.type} </h2>
                    <MyHelmet title="Home" />
                    <h2>React-boil</h2>
                    <UniversalComponent />
                    <Link to="/user/123">User 123</Link>
                    <Link to={{ type: 'USER', payload: { id: 456 } }}>User 456</Link>
                </div>
            )
        case "USER":
            return (
                <div>
                    <h2>{props.location.type}</h2>
                    <h2>{props.userId}</h2>
                    <RaisedButton
                        onClick={() => { props.dispatch({ type: "PING" }) }}
                        label="Default"
                        primary={true}
                    />
                </div >
            )
        default:
            return <h2>default</h2>
    }
}

export const AppRouter = compose(
    connect(({ location, userId }) => ({ location, userId }))
)(AppRouterClass)
