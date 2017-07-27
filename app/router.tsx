import * as React from "react"
import { connect } from 'react-redux'
import { MyHelmet } from "../shared/helmet"
import Link from 'redux-first-router-link'
import { compose } from "recompose"
import { HomeContainer } from "./containers/home/home"
import { UserContainer } from "./containers/user/user"
import { APP_ACTIONS } from "../store/actions";
import { NoMatchContainer } from "./containers/404/404";

const AppRouterClass = (props) => {
    switch (props.location.type) {
        case "HOME":
        case "INDEX":
            return (<HomeContainer {...props} />)
        case "USER":
            return (<UserContainer {...props} />)
        default:
            return <NoMatchContainer {...props} />
    }
}

export const AppRouter = compose(
    connect(({ location, userId, profile, drawer, profiles }) =>
        ({ location, userId, profile, drawer, profiles }), APP_ACTIONS)
)(AppRouterClass)
