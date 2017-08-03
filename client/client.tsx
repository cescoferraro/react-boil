import { AppRouter } from "../app/router"
import { Renderer, tag } from "./renderer"
import { unmountComponentAtNode } from "react-dom"
import { runServiceWorker } from "./sw"
require("offline-js")

if (module.hot) {
    module.hot.accept(
        [
            "../store/createStore.tsx",
            "../app/router.tsx",
            "./renderer.tsx"
        ],
        () => {
            unmountComponentAtNode(tag)
            const NextEatApp = require("../app/router.tsx").AppRouter
            const NewRenderer = require("./renderer.tsx").Renderer
            NewRenderer(NextEatApp)
        })
}

Renderer(AppRouter)
runServiceWorker()
