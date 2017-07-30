import * as React from "react"
import { Item } from "../item/item"
import * as Flag from "react-flags"

class Country extends React.Component<any, any> {
    public render() {
        const icon = (
            <Flag
                name={this.props.profile.nat}
                format="png"
                pngSize={32}
                basePath="/flags"
                className={this.props.CSS.flag}
                alt="Canada Flag"
            />
        )
        return (
            <Item
                title="Nationality"
                value={this.props.profile.nat}
                icon={icon}
            />
        )
    }
}

export default Country
