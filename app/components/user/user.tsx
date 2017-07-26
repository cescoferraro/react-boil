import * as React from "react"
declare var System: any
import * as CSS from "./css/teste.css"
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
export default class User extends React.Component<any, any> {
    render() {
        console.log(this.props)
        const { name } = this.props.profile
        const { title, first, last } = name
        return (
            <div className={CSS.test}>
                <Card>
                    <CardHeader
                        title="URL Avatar"
                        subtitle="Subtitle"
                        avatar={this.props.profile.picture.thumbnail}
                    />
                    <CardTitle
                        title={capitalizeFirstLetter(title) + " " + capitalizeFirstLetter(first)}
                        subtitle={this.props.profile.email}
                    />
                    <CardActions>
                        <FlatButton label="Action1" />
                        <FlatButton label="Action2" />
                    </CardActions>
                </Card>
            </div>
        )
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
