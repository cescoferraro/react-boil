import * as React from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import * as HomeStyle from "./css/app.pcss"
import { push } from 'connected-react-router'
import { UniversalComponent } from "./components/universal"
import { LoadableComponent } from "./components/load"

export class HomeContainer extends React.Component<any, any> {

    public render() {
        console.log(this.props)
        return (
            <div>
                <h2>React-boil</h2>
                {<UniversalComponent />}
                <RaisedButton onClick={() => {
                    this.props.dispatch(push("/whatver"))
                }}
                    label="Default" primary={true} />
            </div >
        )
    }
}

