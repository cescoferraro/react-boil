import * as React from "react"
import { renderToString } from "react-dom/server"

export const HTML = ({ foo, app, css }) => {
    return (<html>
        <head>
            <style type="text/css"
                dangerouslySetInnerHTML={{ __html: css.join('') }}></style>
            <title>{foo}</title>
        </head>
        <body>
            <div id="root"
                dangerouslySetInnerHTML={{ __html: renderToString(app) }} />
            <script src="/client.js"></script>
        </body>
    </html>)
}
