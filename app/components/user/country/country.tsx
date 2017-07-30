import * as React from "react"
import { Item } from "../item/item"
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import * as Flag from "react-flags"

class Country extends React.Component<any, any> {
    public render() {
        return (
            <Item
                title="Nationality"
                value={this.props.profile.nat}
                icon={
                    <Flag
                        name={this.props.profile.nat}
                        format="png"
                        pngSize={32}
                        basePath="/flags"
                        className={this.props.CSS.flag}
                        alt="Canada Flag"
                    />
                }
            />
        )
    }
}

export default Country
