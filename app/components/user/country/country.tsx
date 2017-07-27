import * as React from "react"
import { Item } from "../item/item"
import Flag from "react-world-flags"
class Country extends React.Component<any, any> {
    public render() {
        return (
            <Item
                CSS={this.props.CSS}
                title="Nationality"
                value={this.props.profile.nat}
                icon={<Flag className={this.props.CSS.flag} code={this.props.profile.nat} />}
            />
        )
    }
}

export default Country
