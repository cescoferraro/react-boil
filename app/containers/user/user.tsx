import * as React from "react"
import { Shell } from "../../../shared/components/shell";
import { UniversalComponent } from "../../components/product";
import RaisedButton from 'material-ui/RaisedButton'

export const UserContainer = (props) => (
    <Shell id="USER">
        <h2>{props.location.type}</h2>
        <h2>{props.userId}</h2>
        <UniversalComponent />
        <RaisedButton
            onClick={() => { props.dispatch({ type: "PING" }) }}
            label="Default"
        />
    </Shell>
)
