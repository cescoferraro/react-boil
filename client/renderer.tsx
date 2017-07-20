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
import { toastr } from 'react-redux-toastr'

export const tag = document.getElementById("root")

var upHandler = (e) => {
    toastr.success('The UP', 'cloud 9')
    console.log("upppp")
}
var downHandler = (e) => {
    toastr.error('The down', 'rot in hell')
    console.log("downnnnn")
}
const randomHandler = (name) => (e) => {
    toastr.warning(name, name)
    console.log(name)

}
const offlineCheck = (store) => {
    const { Offline } = (window as any);
    // Set our options for the Offline detection library
    Offline.options = {
        checkOnLoad: true,
        checks: {
            image: {
                url: () => {
                    return 'http://esri.github.io/offline-editor-js/tiny-image.png?_='
                        + (Math.floor(Math.random() * 1000000000));
                }
            },
            active: 'image'
        }
    };
    Offline.check()
    Offline.on("up", upHandler);
    Offline.on("down", downHandler);
}

export const Renderer = Component => {
    const history = createBrowserHistory()
    const store = configureStore(history)
    offlineCheck(store)
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
