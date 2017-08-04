import * as React from "react"
import * as CSS from "./css/teste.css"
import { ListSubheader as Subheader } from "material-ui/List"
import { Item } from "./item/item"
import { compose } from "recompose"
import Code from "material-ui-icons/Code.js"
import Country from "./country/country"
import Terrain from "material-ui-icons/Terrain.js"
import LocationCity from "material-ui-icons/LocationCity.js"
import GpsFixed from "material-ui-icons/GpsFixed.js"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardContent } from "material-ui/Card"

export const UserComponent = (props) => {
    const profile = props.profiles[props.profile.id]
    const grey = { fill: "grey" }
    return (
        <div className={CSS.test}>
            <Card className={props.classes.card}>
                <CardContent>

                    <div className={CSS.title}>
                        <img
                            className={CSS.image}
                            alt=""
                            src={profile.picture.large}
                            width={150}
                        />
                        <div className={CSS.name}>
                            <a>{profile.name.first}</a>
                        </div>
                    </div>
                    <Item
                        title="Email"
                        value={profile.email}
                        icon={<GpsFixed style={grey} />}
                    />
                    <Subheader>Address</Subheader>
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
                </CardContent>
            </Card>
        </div>
    )
}
export default compose(
    withStyles(
        createStyleSheet((theme) => ({
            card: {
                minWidth: 275
            },
            bullet: {
                display: "inline-block",
                margin: "0 2px",
                transform: "scale(0.8)"
            },
            title: {
                marginBottom: 16,
                fontSize: 14,
                color: theme.palette.text.secondary
            },
            pos: {
                marginBottom: 12,
                color: theme.palette.text.secondary
            }
        })
        )
    )
)(UserComponent)
