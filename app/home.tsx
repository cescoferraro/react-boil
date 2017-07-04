import * as React from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import { UniversalComponent } from "./components/universal"
import { MyHelmet } from "../shared/helmet"

export class HomeContainer extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <MyHelmet title="Home" />
                <h2>React-boil</h2>
                <UniversalComponent />
                <RaisedButton onClick={() => {
                    this.props.dispatch({ type: "hey" })
                }}
                    label="Default" primary={true} />
            </div >
        )
    }
}

