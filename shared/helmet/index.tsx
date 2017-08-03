import * as React from "react"
import { Helmet } from "react-helmet"
const Cesco = require("../images/boil.jpg")

export const MyHelmet = ({ title }) => (
    <Helmet>
        <html lang="pt" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <title>{title + " | React-boil"} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#303F9F" />
        <meta property="og:title" content="React-boil" />
        <meta property="og:url" content="https://boil.cescoferraro.xyz" />
        <meta property="og:image" content={Cesco} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="React-boil" />
        <meta property="og:description" content="Cutting Edge PWA React.js boilerplate" />
    </Helmet>

)

export const UserHelmet = ({ id }) => (
    <Helmet>
        <meta charSet="utf-8" />
    </Helmet>
)
