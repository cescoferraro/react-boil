import * as React from "react"
import {
    getScripts, getStyles, Helmator, Manifest,
    OneSignalCDN, OneSignalInit, App, Dll, Javascript, BaseStyle
} from "./helpers"
import { flushedAssets } from "./flush"
import { ToastrCSS } from "../shared/components/toastrCSS"

export const HTML = (
    { clientStats, serverStats, outputPath, production, content, store }
) => {
    const assets = flushedAssets(clientStats, outputPath, production)
    const { preload, scripts } = getScripts(assets.scripts, outputPath, production)
    const styles = getStyles(assets.stylesheets, outputPath, production)
    const MyHelmet = Helmator()
    return (
        <html {...MyHelmet.html}>
            <head >
                <Manifest production={production} />
                {MyHelmet.title}
                {MyHelmet.meta}
                {MyHelmet.link}
                {styles}
                {preload}
                <BaseStyle />
                <ToastrCSS />
                <OneSignalCDN production={production} />
                <OneSignalInit production={production} />
            </head>
            <body {...MyHelmet.html}>
                <App content={content} />
                <Dll outputPath={outputPath} />
                <Javascript scripts={scripts} />
            </body>
        </html>
    )
}
