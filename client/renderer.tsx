import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from 'react-hot-loader';
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../store/createStore";
import { createBrowserHistory } from "history";
import { BoilTheme } from "../shared/theme";



export const tag = document.getElementById("root")

export const Renderer = Component => {
    const history = createBrowserHistory();
    ReactDOM.render(
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
            <ReduxProvider store={configureStore(history)}>
                <MuiThemeProvider muiTheme={
                    getMuiTheme(BoilTheme, { userAgent: navigator.userAgent })}>
                    <AppContainer>
                        <Component />
                    </AppContainer>
                </MuiThemeProvider>
            </ReduxProvider>
        </WithStylesContext >
        , tag)
}
