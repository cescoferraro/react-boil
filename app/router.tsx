import * as React from "react"
import { Route, Switch, Link } from 'react-router-dom'
import { HomeContainer } from "./home";
import { NoMatch } from "../shared/components/nomatch";
import * as Debug from 'debug';
Debug.enable("*")


export let Router = () => {
    var debug = Debug("ROUTER")
    debug('Request if being handled!');
    return (
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route component={NoMatch} />
        </Switch>
    )
}
