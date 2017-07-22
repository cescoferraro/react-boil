import * as React from "react"
import { Helmet } from "react-helmet"

const CachedFs = require('cachedfs'),
    fs = new CachedFs();

const path = require("path")

declare module 'react' {
    interface HTMLAttributes<T> extends React.DOMAttributes<T> {
        as?: string
    }
}

export const BaseStyle = () => (
    <style type="text/css">
        {`body {background-color: whitesmoke; height:100vh; margin:0;}`}
    </style>
)

export const OneSignalCDN = ({ production }) => {
    return (
        production ?
            (<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async={true} />) :
            null)
}
export const OneSignalInit = ({ production }) => {
    const text = ` var OneSignal = window.OneSignal || []; ` +
        `OneSignal.push(["init", {` +
        `appId: "396fb320-f5e2-4ed2-af88-efbee83b2564", ` +
        `autoRegister: true, notifyButton: {enable: true}}]); `
    return production ?
        (
            <script dangerouslySetInnerHTML={{ __html: text }} />
        ) :
        null
}
export const Dll = ({ outputPath }) => {
    const place = path.resolve(outputPath, "../dll/vendor.dll.js")
    console.log(fs.existsSync(place) ? "using dll" : " not using dll")
    return fs.existsSync(place) ?
        <script id="dll" src="/dll/vendor.dll.js" type="text/javascript" /> :
        null
}
export const App = ({ content }) => (
    <div
        id="root"
        dangerouslySetInnerHTML={{ __html: content }}
    />
)
export const Javascript = ({ scripts }) => (<span>{scripts}</span>)
export const Manifest = ({ production }) => {
    return production ? <link rel="manifest" href="/manifest.json" /> : null
}
export const getScripts = (scripts: Array<string>, outputPath, production) => {
    return scripts.reduce(
        (acc, script: string) => {
            const scriptPath = `/${script}`;
            const place = path.join(outputPath, scriptPath)

            let preload = (
                <link
                    rel="preload"
                    href={scriptPath}
                    key={script}
                    as="script"
                />
            );

            let scriptTag = (
                <script
                    src={scriptPath}
                    key={script}
                    type="text/javascript"
                />
            );
            if (production) {
                if (place.includes("bootstrap")) {
                    scriptTag = (
                        <script
                            type="text/javascript"
                            dangerouslySetInnerHTML={{ __html: fs.readFileSync(place, 'utf8') }}
                        />
                    )
                    preload = null;
                }
            }

            return {
                preload: [...acc.preload, preload],
                scripts: [...acc.scripts, scriptTag],
            };
        },
        {
            preload: [],
            scripts: [],
        },
    );
};

export const getStyles = (styles: Array<string>, outputPath, production) => {
    return styles.map((style: string) => {
        const stylePath = `/${style}`;
        const place = outputPath + stylePath
        return production ? (
            <style
                dangerouslySetInnerHTML={{ __html: fs.readFileSync(place, 'utf8') }}
            />
        ) : (
                <link
                    href={stylePath}
                    key={style}
                    media="screen, projection"
                    rel="stylesheet"
                    async={true}
                    type="text/css"
                    charSet="UTF-8"
                />
            );
    });
};


export const Helmator = () => {
    const HelmetApp = Helmet.renderStatic()
    return ({
        html: HelmetApp.htmlAttributes.toComponent(),
        body: HelmetApp.bodyAttributes.toComponent(),
        title: HelmetApp.title.toComponent(),
        meta: HelmetApp.meta.toComponent(),
        link: HelmetApp.link.toComponent()
    })
}
