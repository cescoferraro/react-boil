import * as React from "react"
import { flushedAssets } from "./flush"
import { getScripts, getStyles, Helmator } from "./helpers"

const path = require("path")
const CachedFs = require('cachedfs'),
    fs = new CachedFs();

export const HTML = (
    { clientStats, serverStats, outputPath, production, content, store }
) => {
    const place = path.resolve(outputPath, '../dll/vendor.dll.js')
    const assets = flushedAssets(clientStats, outputPath, production)
    const { preload, scripts } = getScripts(assets.scripts, outputPath, production);
    const styles = getStyles(assets.stylesheets);
    const MyHelmet = Helmator()
    console.log(place)
    console.log(fs.existsSync(place))
    return (
        <html {...MyHelmet.html}>
            <head >
                {MyHelmet.title}
                {MyHelmet.meta}
                {MyHelmet.link}
                {styles}
            </head>
            <body {...MyHelmet.html}>
                <div id="root"
                    dangerouslySetInnerHTML={{ __html: content }} />
                {fs.existsSync(place) ?
                    <script id="dll" src="/dll/vendor.dll.js" type="text/javascript" /> :
                    null}
                {scripts} </body>
        </html>
    )
}
