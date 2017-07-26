import * as React from "react"
declare var System: any
import * as CSS from "./css/teste.css"
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Flag from 'react-world-flags'
import { Profile, ProfileClass } from "../../../store/reducers";
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Code from 'material-ui/svg-icons/action/code';
import Terrain from 'material-ui/svg-icons/maps/terrain';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import LocationCity from 'material-ui/svg-icons/social/location-city';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import GpsFixed from 'material-ui/svg-icons/device/gps-fixed';
import Directions from 'material-ui/svg-icons/maps/directions';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';


const Item = ({ icon, title, value }) => {
    return <div className={CSS.item}>
        <div className={CSS.itemIcon}>
            {icon}
        </div>
        <div className={CSS.itemText}>
            <a className={CSS.key}> {title} </a>
            <a className={CSS.value}> {value} </a>
        </div>
    </div>
}



class User extends React.Component<any, any> {

    render() {
        console.log(this.props.profiles)
        console.log(this.props.profile.id)
        console.log(this.props.profile)
        const profile: ProfileClass = new ProfileClass(this.props.profile)
        return (
            <div className={CSS.test}>
                <Card>
                    <div className={CSS.title}>
                        <img className={CSS.image} alt="" src={profile.picture.medium} width={150} />
                        <div className={CSS.name}><a>{profile.name.first}</a></div>
                    </div>
                    <Item title="Fullname" value={profile.fullname()} icon={<AccountCircle style={{ fill: "grey" }} />} />
                    <br />
                    <Item title="Email" value={profile.email} icon={<GpsFixed style={{ fill: "grey" }} />} />
                    <br />
                    <Subheader>Address</Subheader>
                    <Item title="Street" value={profile.location.street} icon={<Code className={CSS.flag} />} />
                    <br />
                    <Item title="City" value={profile.location.city} icon={<LocationCity className={CSS.flag} />} />
                    <br />
                    <Item title="Zip-Code" value={profile.location.postcode} icon={<Code className={CSS.flag} />} />
                    <br />
                    <Item title="State" value={profile.location.state} icon={<Terrain className={CSS.flag} />} />
                    <br />
                    <Item title="Nationality" value={profile.nat} icon={<Flag className={CSS.flag} code={profile.nat} />} />
                    <br />
                    <Divider />
                </Card>
            </div>
        )
    }
}

export default User
