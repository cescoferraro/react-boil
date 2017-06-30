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

const idsSpace = (clientStats) => {
    const moduleIds = flushModuleIds()
    console.log(moduleIds)
    const { js, styles } = flushChunks(clientStats,
        {
            moduleIds,
            before: ['bootstrap'],
            after: ['main']
        }
    )
    console.log(js.toString())
}

const namesSpace = (clientStats) => {
    const chunkNames = flushChunkNames()
    console.log(chunkNames)
    const scripts = flushFiles(clientStats, { chunkNames, filter: 'js' })
    console.log(scripts)
}


export const HTML = ({ clientStats, serverStats,
    production, css, appString, store, title }) => {
    idsSpace(clientStats)
    return (<html>
        <head>
            <link rel="shortcut icon" href="icons/favicon.ico" />
            <style type="text/css">{css.join('  ')}</style>
            <title>{title}</title>
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: appString }} />
            {production ? null : <script type={type} async src="/dll/vendor.js"></script>}
            <script type={type} src="/bootstrap.js"></script>
            <script type={type} async src="/client.js"></script>
        </body>
    </html>)
}
