import * as React from "react"


export const getScripts = (scripts: Array<string>) => {
    return scripts.reduce(
        (acc, script: string) => {
            const scriptPath = `/${script}`;

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
                    defer={true}
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
                type="text/css"
                charSet="UTF-8"
            />
        );
    });
};
