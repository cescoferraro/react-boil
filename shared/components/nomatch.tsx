import * as React from "react";
import { push } from "connected-react-router"
import { compose } from "recompose"
import { connect } from "react-redux"

export const NoMatch = compose(connect())(({ dispatch }) => {
    return (<div>
        <h2>I dont know where you want to go.</h2>
        <button onClick={() => dispatch(push("/"))} >GO somewhere nice!</button>
    </div>
    )
})
