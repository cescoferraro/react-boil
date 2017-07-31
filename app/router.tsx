import * as React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import { APP_ACTIONS } from "../store/actions"
import { NoMatchContainer } from "./components/404/404"
import { Shell } from "./components/shell/index"
import { MyHelmet } from "../shared/helmet/index"
import { AsyncUser } from "./components/user"
import { HomeComponent } from "./components/home"

const AppRouterClass = (props) => {
    switch (props.location.type) {
        case "HOME":
            return (
                <Shell {...props}>
                    <MyHelmet title="Home" />
                    <HomeComponent />
                </Shell>
            )
        case "USER":
            return (
                <Shell id="USER" {...props}>
                    <MyHelmet title="User" />
                    <AsyncUser {...props} />
                </Shell>
            )
        default:
            return (
                <Shell id="404" {...props}>
                    <MyHelmet title="404" />
                    <NoMatchContainer {...props} />
                </Shell>
            )
    }
}

export const AppRouter = compose(
    connect(({ location, userId, profile, drawer, profiles }) =>
        ({ location, userId, profile, drawer, profiles }), APP_ACTIONS)
)(AppRouterClass)
