import * as React from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import { UniversalComponent } from "./components/universal"
import { MyHelmet } from "../shared/helmet"
import Link from 'redux-first-router-link'
import { compose } from "recompose"


class AppRouterClass extends React.Component<any, any> {
    public render() {
        console.log(this.props)
        switch (this.props.location.type) {
            case "HOME":
                return <h2>
                    {this.props.location.type}
                    jsjsjsj</h2>
            default:
                return (
                    <div>
                        {this.props.location.type}
                        <MyHelmet title="Home" />
                        <h2>React-boil</h2>
                        <UniversalComponent />
                        <Link to="/">User 123</Link>
                        <Link to="/user/123">User 123</Link>
                        <Link to={{ type: 'USER', payload: { id: 456 } }}>User 456</Link>
                        <RaisedButton
                            onClick={() => { this.props.dispatch({ type: "PING" }) }}
                            label="Default"
                            primary={true}
                        />
                    </div >
                )
        }
    }
}

export const AppRouter = compose(
    connect(({ location }) => ({ location }))
)(AppRouterClass)
