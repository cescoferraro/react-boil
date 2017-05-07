import * as React from "react"
import { Route, Switch, Link } from 'react-router-dom'
import { HomeContainer } from "./home";

export let Router = () => {
    return (
        <div >
            <Route exact path="/" component={HomeContainer} />
        </div >
    )
}

