import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppRouter } from "../app/router"
import { Renderer, tag } from "./renderer";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { unmountComponentAtNode } from "react-dom";
import { configureStore } from "../store/createStore";
import { createBrowserHistory } from "history";


injectTapEventPlugin();



let history = createBrowserHistory();
let store = configureStore(history)
const app = Renderer(AppRouter, store, history)

ReactDOM.render(app, tag)

if (module.hot) {
    module.hot.accept(
        [
            "../store/createStore.tsx",
            "../app/router.tsx",
            "./renderer.tsx"
        ],
        () => {
            unmountComponentAtNode(tag);
            const NextEatApp = require("../app/router.tsx").AppRouter;
            const NextRenderer = require("./renderer.tsx").Renderer;
            ReactDOM.render(NextRenderer(NextEatApp, store, history), tag)
        });
}
