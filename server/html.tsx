import * as React from "react"
import { flushedAssets } from "./flush"
import { getScripts, getStyles, Helmator } from "./helpers"
const path = require("path")
const CachedFs = require('cachedfs'),
    fs = new CachedFs();

const BaseStyle = () => (
    <style type="text/css">
        {`body {background-color: whitesmoke; height:100vh; margin:0;}`}
    </style>
)

export const HTML = (
    { clientStats, serverStats, outputPath, production, content, store }
) => {
    const place = path.resolve(outputPath, '../dll/vendor.dll.js')
    const assets = flushedAssets(clientStats, outputPath, production)
    const { Js, cssHash } = assets
    const { preload, scripts } = getScripts(assets.scripts, outputPath, production);
    const styles = getStyles(assets.stylesheets);
    const MyHelmet = Helmator()
    console.log(fs.existsSync(place) ? "using dll" : " not using dll")
    return (
        <html {...MyHelmet.html}>
            <head >
                {production ? <link rel="manifest" href="/icons/manifest.json" /> : null}
                {MyHelmet.title}
                {MyHelmet.meta}
                {MyHelmet.link}
                {styles}
                <BaseStyle />
            </head>
            <body {...MyHelmet.html}>
                <div id="root"
                    dangerouslySetInnerHTML={{ __html: content }} />
                {fs.existsSync(place) ?
                    <script id="dll" src="/dll/vendor.dll.js" type="text/javascript" /> :
                    null}
                {scripts}
            </body>
        </html>
    )
}
