import * as React from "react"
import { Helmet } from "react-helmet"

export const MyHelmet = ({ title }) => (
    <Helmet>
        <html lang="pt" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <title>{title + " | React-boil"} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#303F9F" />
    </Helmet>

)

