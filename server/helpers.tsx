import * as React from "react"
import { Helmet } from "react-helmet"

const CachedFs = require('cachedfs'),
    fs = new CachedFs();

const path = require("path")

export const getScripts = (scripts: Array<string>, outputPath, production) => {
    return scripts.reduce(
        (acc, script: string) => {
            const scriptPath = `/${script}`;
            const place = path.join(outputPath, scriptPath)

            const preload = (
                <link
                    rel="preload"
                    href={scriptPath}
                    key={script}
                />
            );

            const scriptTag = (
                <script
                    src={scriptPath}
                    key={script}
                    type="text/javascript"
                />
            );

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

export const getStyles = (styles: Array<string>) => {
    return styles.map((style: string) => {
        const stylePath = `/${style}`;

        return (
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
