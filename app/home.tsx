import * as React from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import { HomeStyle } from "./styles";
import { push } from 'connected-react-router'
import * as Debug from 'debug';

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
        var debug = Debug("HomeContainer")
        debug('CREATED!');
        return (
            <div>
                <div className={HomeStyle.app}>
                    <h2>React-boil</h2>
                    <h2>React-boil</h2>
                    <h2>React-boil</h2>
                    <h2>React-boil</h2>
                    <RaisedButton onClick={() => {
                        this.props.dispatch(push("/whatver"))
                    }}
                        label="Default" primary={true} />
                </div>
                <div className={HomeStyle.container}>
                    <h2>TWO</h2>
                </div>
            </div >
        )
    }
}

