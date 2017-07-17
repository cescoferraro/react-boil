import * as React from "react"
declare var System: any
import * as CSS from "./css/teste.css"

export default (props) => {
    return (
        <div className={CSS.test}>
            <h2>{props.id}</h2>
            <h2>I am on a separate Bundle!</h2>
        </div>
    )
}
