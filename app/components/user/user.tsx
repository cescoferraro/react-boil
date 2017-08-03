import * as React from "react"
import * as CSS from "./css/teste.css"
import { Card } from "material-ui/Card"
import { ProfileClass } from "../../../store/reducers"
import Code from "material-ui-icons/Code.js"
import Terrain from "material-ui-icons/Terrain.js"
import LocationCity from "material-ui-icons/LocationCity.js"
import AccountCircle from "material-ui-icons/AccountCircle.js"
import GpsFixed from "material-ui-icons/GpsFixed.js"
import Divider from "material-ui/Divider"
import { Item } from "./item/item"
import { compose } from "recompose"
import sizeMe from "react-sizeme"
import Country from "./country/country"
import { ListSubheader } from 'material-ui/List';


export class UserComponent extends React.Component<any, any> {
    public render() {
        const profile: ProfileClass = new ProfileClass(this.props.profiles[this.props.profile.id])
        const grey = { fill: "grey" }
        return (
            <div className={CSS.test}>
                <Card>
                    <div className={CSS.title}>
                        <img
                            className={CSS.image}
                            alt=""
                            src={this.props.size.width > 300 ? profile.picture.large : profile.picture.medium}
                            width={150}
                        />
                        <div className={CSS.name}>
                            <a>{profile.name.first}</a>
                        </div>
                    </div>
                    <Item
                        title="Fullname"
                        value={profile.fullname()}
                        icon={<AccountCircle style={grey} />}
                    />
                    <Item
                        title="Email"
                        value={profile.email}
                        icon={<GpsFixed style={grey} />}
                    />
                    <ListSubheader>Address</ListSubheader>
                    <Item
                        title="Street"
                        value={profile.location.street}
                        icon={<Code style={grey} className={CSS.flag} />}
                    />
                    <Item
                        title="City"
                        value={profile.location.city}
                        icon={<LocationCity style={grey} className={CSS.flag} />}
                    />
                    <Item
                        title="Zip-Code"
                        value={profile.location.postcode}
                        icon={<Code style={grey} className={CSS.flag} />}
                    />
                    <Item
                        title="State"
                        value={profile.location.state}
                        icon={<Terrain style={grey} className={CSS.flag} />}
                    />
                    <Country profile={profile} className={CSS.flag} />
                    <Divider />
                </Card>
            </div>
        )
    }
}

export default compose(sizeMe())(UserComponent)
