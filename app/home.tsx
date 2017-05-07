import * as React from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'
import { HomeStyle } from "./styles";
import { push } from 'connected-react-router'

@withStyles(HomeStyle)
@firebaseConnect([
    '/app'
])
@connect(
    ({ firebase, todos }) => ({
        app: dataToJS(firebase, '/app'),
        todos: todos
    })
)
export class HomeContainer extends React.Component<any, any> {
    render() {
        console.log(this.props)
        return (
            <div className={HomeStyle.app} >
                <h2>React-boil</h2>
                <h2>React-boil</h2>
                <h2>React-boil</h2>
                <h2>React-boil</h2>
                <h2>React-boil</h2>
                <h2>React-boil</h2>
                <RaisedButton onClick={() => {
                    this.props.dispatch(push("/whatver"))
                }}
                    label="Default" primary={true} />
            </div >
        )
    }
}
