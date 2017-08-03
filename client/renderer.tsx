import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { Provider as ReduxProvider } from "react-redux"
import { configureStore, engine } from "../store/createStore"
import { createBrowserHistory } from "history"
import { BoilTheme } from "../shared/theme"
import * as storage from "redux-storage"
import { toastr } from "react-redux-toastr"
import { offlineCheck } from "./offline"

export const tag = document.getElementById("root")
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { green, red } from 'material-ui/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: createPalette({
        primary: green,
        accent: red,
        type: 'light',
    }),
});

export const Renderer = (Component) => {
    const history = createBrowserHistory()
    const store = configureStore(history)
    offlineCheck(store)
    if ((window as any).__PRODUCTION__) {
        storage.createLoader(engine)(store)
            .then((newState) => { store.dispatch(newState.location) })
            .catch(() => console.log("Failed to load previous state"))
    }
    ReactDOM.render(
        <ReduxProvider store={store}>
            <MuiThemeProvider theme={theme}>
                <AppContainer>
                    <Component />
                </AppContainer>
            </MuiThemeProvider>
        </ReduxProvider>, tag)
}
