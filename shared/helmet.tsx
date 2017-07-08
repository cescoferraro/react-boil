import * as React from "react"
import { Helmet } from "react-helmet"


export const MyHelmet = ({ title }) => (
    <Helmet>
        <html lang="pt" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <title>{title + " | React-boil"} </title>
        <link rel="canonical" href="http://boil.cescoferraro.xyz" />

    </Helmet>

)
