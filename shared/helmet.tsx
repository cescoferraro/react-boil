import * as React from "react"
import { Helmet } from "react-helmet"


export const MyHelmet = ({ title }) => (
    <Helmet>
        <html lang="pt" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="manifest" href="/icons/manifest.json" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <meta name="theme-color" content="#00bfff" />
        <title>{title + " | React-boil"} </title>
        <link rel="canonical" href="http://boil.cescoferraro.xyz" />
    </Helmet>

)
