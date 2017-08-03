import * as React from "react"
import * as CSS from "./css/teste.css"
import { ListSubheader as Subheader } from 'material-ui/List'
import { ProfileClass } from "../../../store/reducers"
import Divider from "material-ui/Divider"
import { Item } from "./item/item"
import { compose } from "recompose"
import Code from "material-ui-icons/Code.js"
import sizeMe from "react-sizeme"
import Country from "./country/country"
import Terrain from "material-ui-icons/Terrain.js"
import LocationCity from "material-ui-icons/LocationCity.js"
import AccountCircle from "material-ui-icons/AccountCircle.js"
import GpsFixed from "material-ui-icons/GpsFixed.js"




import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet(theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
}));

export class UserComponent extends React.Component<any, any> {
    public render() {
        const profile: ProfileClass = new ProfileClass(this.props.profiles[this.props.profile.id])
        const classes = this.props.classes;
        const bull = <span className={classes.bullet}>•</span>;
        const grey = { fill: "grey" }
        return (
            <div className={CSS.test}>
                <Card className={classes.card}>
                    <CardContent>

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
                            title="Id"
                            value={profile.id}
                            icon={<AccountCircle style={grey} />}
                        />
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
                    <CardActions>
                        <Button dense>Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default compose(sizeMe(), withStyles(styleSheet))(UserComponent)
