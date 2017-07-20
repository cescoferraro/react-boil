import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from 'react-hot-loader';
import { WithStylesContext } from "../shared/components/styles.context";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore, engine } from "../store/createStore";
import { createBrowserHistory } from "history";
import { BoilTheme } from "../shared/theme";
import * as storage from 'redux-storage'

export const tag = document.getElementById("root")

export const Renderer = Component => {
    const history = createBrowserHistory()
    const store = configureStore(history)
    const load = storage.createLoader(engine);
    load(store)
        .then((newState) => {
            store.dispatch(newState.location)
        })
        .catch(() => console.log('Failed to load previous state'));
    ReactDOM.render(
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
            <ReduxProvider store={store}>
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
