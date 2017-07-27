import * as React from "react"
import { Shell } from "../../../shared/components/shell";
import { AsyncUser } from "../../components/user";
import RaisedButton from 'material-ui/RaisedButton'
import { MyHelmet } from "../../../shared/helmet"

export const NoMatchContainer = (props) => {
    return (<Shell id="404" {...props}>
        <MyHelmet title="404" />
        <div>
            <h2>NOT FOUDN</h2>
        </div>
    </Shell>)
}
