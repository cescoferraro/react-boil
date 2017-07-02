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

const UniversalJavascript = (clientStats, outputPath) => {
    const moduleIds = flushModuleIds()
    const chunkNames = flushChunkNames()
    return {
        moduleIds,
        chunkNames,
        ...flushChunks(clientStats, {
            chunkNames,
            before: ['bootstrap'],
            after: ['main'],
            outputPath
        })
    }
}

const namesSpace = (clientStats) => {
    const chunkNames = flushChunkNames()
    console.log(chunkNames)
    const scripts = flushFiles(clientStats, { chunkNames, filter: 'js' })
    const css = flushFiles(clientStats, { chunkNames, filter: 'css' })
    console.log(scripts)
    console.log(css)
}


export const HTML = ({ clientStats, serverStats,
    outputPath, production, cssString, appString, store, title }) => {
    console.log("receiver")
    const {
        // react components:
        Js,     // javascript chunks
        Styles, // external stylesheets
        Css,    // raw css

        // strings:
        js,     // javascript chunks
        styles, // external stylesheets
        css,    // raw css

        // arrays of file names:
        scripts,
        stylesheets,

        // important paths:
        publicPath,
        chunkNames,
        moduleIds } = UniversalJavascript(clientStats, outputPath)

    console.log('SERVED SCRIPTS', scripts)
    console.log('SERVED STYLESHEETS', stylesheets)
    console.log(chunkNames)
    console.log(css.toString())
    return (<html>
        <head>
            <link rel="shortcut icon" href="icons/favicon.ico" />
            <Styles />
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: appString }} />
            <Js />
        </body>
    </html>)
}
