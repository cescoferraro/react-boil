import * as React from "react"
import { connect } from 'react-redux'
import { MyHelmet } from "../shared/helmet"
import Link from 'redux-first-router-link'
import { compose } from "recompose"
import { HomeContainer } from "./containers/home/home"
import { UserContainer } from "./containers/user/user"
import { APP_ACTIONS } from "../store/actions";

const AppRouterClass = (props) => {
    switch (props.location.type) {
        case "HOME":
        case "INDEX":
            return (<HomeContainer {...props} />)
        case "USER":
            return (<UserContainer {...props} />)
        default:
            return <h2>default</h2>
    }
}

export const AppRouter = compose(
    connect(({ location, userId, drawer }) =>
        ({ location, userId, drawer }), APP_ACTIONS)
)(AppRouterClass)
