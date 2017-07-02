import * as React from "react"
import { flushedAssets } from "./flush"

export const HTML = ({ clientStats, serverStats,
    outputPath, production, cssString, appString, store, title }) => {
    console.log("receiver")
    const { Js, scripts, stylesheets } = flushedAssets(clientStats, outputPath)
    return (<html>
        <head>
            {stylesheets.map((styleUrl) =>
                (<link key={Math.random()} rel="stylesheet" type="text/css" href={styleUrl} />))}
            <link rel="shortcut icon" href="icons/favicon.ico" />
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: appString }} />
            <Js />
        </body>
    </html>)
}
