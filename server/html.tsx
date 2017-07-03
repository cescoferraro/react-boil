import * as React from "react"
import { flushedAssets } from "./flush"
import { getScripts, getStyles } from "./helpers"

const path = require("path")
const fs = require("fs")

export const HTML = ({ clientStats, serverStats,
    outputPath, production, cssString, appString, store, title }) => {
    console.log("receiver")
    const place = path.resolve(outputPath, '../dll/dll.js')
    console.log(place)
    const vendorDllFileExists = fs.existsSync(place)
    console.log(vendorDllFileExists)
    const assets = flushedAssets(clientStats, outputPath, production)
    const { preload, scripts } = getScripts(assets.scripts);
    const styles = getStyles(assets.stylesheets);
    return (<html>
        <head>
            <link rel="shortcut icon" href="icons/favicon.ico" />
            {styles}
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: appString }} />
            {vendorDllFileExists &&
                <script
                    src={'/dll.js'}
                    defer
                    charSet="UTF-8"
                />}
            {scripts}
        </body>
    </html>)
}
