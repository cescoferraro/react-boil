import * as React from "react"
const type = "text/javascript";
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { AppRouter } from "../app/router"
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { configureStore } from "../store/createStore";
import { StaticRouter } from "react-router-dom";
import { flushModuleIds } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { flushChunkNames } from 'react-universal-component/server'
import { flushFiles } from 'webpack-flush-chunks'

const UniversalJavascript = (clientStats) => {
    const moduleIds = flushModuleIds()
    const { js, styles, Js } = flushChunks(clientStats, {
        moduleIds,
        before: ['bootstrap'],
        after: ['main']
    })
    return Js
}
function flatten(array) {
    return [].concat(...array)
}

const namesSpace = (clientStats) => {
    const chunkNames = flushChunkNames()
    console.log(chunkNames)
    const scripts = flushFiles(clientStats, { chunkNames, filter: 'js' })
    console.log(scripts)
}


export const HTML = ({ clientStats, serverStats,
    production, css, appString, store, title }) => {
    console.log("receiver")
    const Js = UniversalJavascript(clientStats)
    return (<html>
        <head>
            <link rel="shortcut icon" href="icons/favicon.ico" />
            <style type="text/css">{css.join('  ')}</style>
            <title>{title}</title>
            <script
                dangerouslySetInnerHTML={{ __html: "var PRODUCTION=" + production }}
            />
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: appString }} />
            <Js />
        </body>
    </html>)
}
