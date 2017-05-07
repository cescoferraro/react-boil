import * as React from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles';
const css = require("./app.pcss")
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    dataToJS
} from 'react-redux-firebase'


@withStyles(css)
@firebaseConnect([
    '/app'
])
@connect(
    ({ firebase, todos }) => ({
        app: dataToJS(firebase, '/app'),
        todos: todos
    })
)
export class App extends React.Component<any, any> {
    render() {
        console.log("aqui")
        console.log("aqui")
        return (
            <div className={css.app} >
                <h2>React-boil</h2>
                <RaisedButton onClick={() => { console.log(this.props.app) }}
                    label="Default" primary={true} />
            </div >
        )
    }
}
