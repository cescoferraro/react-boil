import * as React from "react"
import { Shell } from "../../../shared/components/shell"
import { AsyncUser } from "../../components/user"
import { MyHelmet } from "../../../shared/helmet"

export const UserContainer = (props) => {
    return (
        <Shell id="USER" {...props}>
            <MyHelmet title="User" />
            <AsyncUser {...props} />
        </Shell>
    )
}
