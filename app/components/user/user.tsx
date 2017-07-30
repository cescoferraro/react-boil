import * as React from "react"
declare var System: any
import * as CSS from "./css/teste.css"
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { MyHelmet, UserHelmet } from "../../../shared/helmet"
import Subheader from 'material-ui/Subheader';
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
import { Item } from "./item/item";
import { compose } from "recompose"
import sizeMe from 'react-sizeme'
import { AsyncCountry } from "./country"

class User extends React.Component<any, any> {
    render() {
        console.log(this.props.profiles)
        console.log(this.props.profile.id)
        console.log(this.props)
        const profile: ProfileClass = new ProfileClass(this.props.profiles[this.props.profile.id])
        return (
            <div className={CSS.test}>
                <UserHelmet id={this.props.profile.id} />
                <Card>
                    <div className={CSS.title}>
                        <img className={CSS.image} alt="" src={this.props.size.width > 300 ? profile.picture.large : profile.picture.medium} width={150} />
                        <div className={CSS.name}><a>{profile.name.first}</a></div>
                    </div>
                    <Item title="Fullname" value={profile.fullname()} icon={<AccountCircle style={{ fill: "grey" }} />} />
                    <Item title="Email" value={profile.email} icon={<GpsFixed style={{ fill: "grey" }} />} />
                    <Subheader>Address</Subheader>
                    <Item title="Street" value={profile.location.street} icon={<Code style={{ fill: "grey" }} className={CSS.flag} />} />
                    <Item title="City" value={profile.location.city} icon={<LocationCity style={{ fill: "grey" }} className={CSS.flag} />} />
                    <Item title="Zip-Code" value={profile.location.postcode} icon={<Code style={{ fill: "grey" }} className={CSS.flag} />} />
                    <Item title="State" value={profile.location.state} icon={<Terrain style={{ fill: "grey" }} className={CSS.flag} />} />
                    {/* <Item CSS={CSS} title="Nationality" value={profile.nat} icon={<Flag className={CSS.flag} code={profile.nat} />} /> */}
                    <AsyncCountry profile={profile} CSS={CSS} />
                    <Divider />
                </Card>
            </div>
        )
    }
}


export default compose(sizeMe())(User)
