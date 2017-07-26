import * as React from "react"
import { Shell } from "../../../shared/components/shell";
import { AsyncUser } from "../../components/user";
import RaisedButton from 'material-ui/RaisedButton'
import { MyHelmet } from "../../../shared/helmet"

export const UserContainer = (props) => {
    console.log(props)
    return (<Shell id="USER" {...props}>
        <MyHelmet title="User" />
        <AsyncUser profile={props.profile} />
    </Shell>)
}
