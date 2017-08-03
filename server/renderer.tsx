import * as React from "react"
import { renderToString } from "react-dom/server"
import { AppRouter } from "../app/router"
import { Provider as ReduxProvider } from "react-redux"
import { BoilTheme } from "../shared/theme"
import { JssProvider, SheetsRegistry } from 'react-jss'
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { green, red } from 'material-ui/colors';


export const Renderer = (req, store) => {
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Create a theme instance.
    const theme = createMuiTheme({
        palette: createPalette({
            primary: green,
            accent: red,
            type: 'light',
        }),
    });
    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName;
    const app = renderToString(
        <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider theme={theme} sheetsManager={new WeakMap()}>
                <ReduxProvider store={store}>
                    <AppRouter />
                </ReduxProvider>
            </MuiThemeProvider >
        </JssProvider>
    )

    const css = sheetsRegistry.toString()
    return { app, string: app, css }
}
