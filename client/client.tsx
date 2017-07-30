import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppRouter } from "../app/router"
import { AppContainer } from 'react-hot-loader';
import { Renderer, tag } from "./renderer";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
import { unmountComponentAtNode } from "react-dom";
import { runServiceWorker } from "./sw"
injectTapEventPlugin();
require('offline-js');

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
            const NewRenderer = require("./renderer.tsx").Renderer;
            NewRenderer(NextEatApp);
        });
}



Renderer(AppRouter)
runServiceWorker()
