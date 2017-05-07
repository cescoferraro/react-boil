import * as React from "react"
import { renderToString } from "react-dom/server"
const type = "text/javascript";
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
            <script type={type} async src="/client.js"></script>
        </body>
    </html>)
}
