import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from 'react-hot-loader';
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";

import { createBrowserHistory } from "history";



export const tag = document.getElementById("root")

export const Renderer = Component => {
    const history = createBrowserHistory();
    ReactDOM.render(
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
            <ReduxProvider store={configureStore()}>
                <MuiThemeProvider muiTheme={
                    getMuiTheme({ userAgent: navigator.userAgent })}>
                    <AppContainer>
                        <Component />
                    </AppContainer>
                </MuiThemeProvider>
            </ReduxProvider>
        </WithStylesContext >
        , tag)
}
