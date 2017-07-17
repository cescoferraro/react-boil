import * as React from "react"
import { Helmet } from "react-helmet"


export const MyHelmet = ({ title }) => (
    <Helmet>
        <html lang="pt" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <title>{title + " | React-boil"} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00bfff" />
    </Helmet>

)

export const BaseStyle = () => (
    <style type="text/css">
        {`body {background-color: whitesmoke; height:100vh; margin:0;}`}
    </style>
)
