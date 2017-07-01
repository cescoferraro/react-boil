import * as React from "react"
import { Route, Switch, Link } from 'react-router-dom'
import { HomeContainer } from "./home";
import { NoMatch } from "../shared/components/nomatch";


export let AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route component={NoMatch} />
        </Switch>
    )
}
