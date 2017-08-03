import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { HTML } from "./html"
import { configureStore } from "../store/createStore"
import { Renderer } from "./renderer"
import createHistory from "history/createMemoryHistory"
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

export default function serverRenderer(props) {
    return (req, res, next) => {
        const store = configureStore(createHistory({ initialEntries: [req.path] }))
        const render = Renderer(req, store)
        res.send("<!DOCTYPE html>" +
            renderToStaticMarkup(
                <HTML
                    store={store}
                    content={render.string}
                    {...props}
                />
            ))

    }
}
