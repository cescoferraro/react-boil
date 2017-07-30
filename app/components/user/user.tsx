import * as React from "react"
import * as CSS from "./css/teste.css"
import { Card } from "material-ui/Card"
import Subheader from "material-ui/Subheader"
import { ProfileClass } from "../../../store/reducers"
import Code from "material-ui/svg-icons/action/code"
import Terrain from "material-ui/svg-icons/maps/terrain"
import LocationCity from "material-ui/svg-icons/social/location-city"
import AccountCircle from "material-ui/svg-icons/action/account-circle"
import GpsFixed from "material-ui/svg-icons/device/gps-fixed"
import Divider from "material-ui/Divider"
import { Item } from "./item/item"
import { compose } from "recompose"
import sizeMe from "react-sizeme"
import { AsyncCountry } from "./country"

export class UserComponent extends React.Component<any, any> {
    public render() {
        const profile: ProfileClass = new ProfileClass(this.props.profiles[this.props.profile.id])
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
                        icon={<AccountCircle style={{ fill: "grey" }} />}
                    />
                    <Item
                        title="Email"
                        value={profile.email}
                        icon={<GpsFixed style={{ fill: "grey" }} />}
                    />
                    <Subheader>Address</Subheader>
                    <Item
                        title="Street"
                        value={profile.location.street}
                        icon={<Code style={{ fill: "grey" }} className={CSS.flag} />}
                    />
                    <Item
                        title="City"
                        value={profile.location.city}
                        icon={<LocationCity style={{ fill: "grey" }} className={CSS.flag} />}
                    />
                    <Item
                        title="Zip-Code"
                        value={profile.location.postcode}
                        icon={<Code style={{ fill: "grey" }} className={CSS.flag} />}
                    />
                    <Item
                        title="State"
                        value={profile.location.state}
                        icon={<Terrain style={{ fill: "grey" }} className={CSS.flag} />}
                    />
                    <AsyncCountry profile={profile} CSS={CSS} />
                    <Divider />
                </Card>
            </div>
        )
    }
}

export default compose(sizeMe())(UserComponent)
