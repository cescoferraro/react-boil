import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { Provider as ReduxProvider } from "react-redux"
import { configureStore, engine } from "../store/createStore"
import { createBrowserHistory } from "history"
import { BoilTheme } from "../shared/theme"
import * as storage from "redux-storage"
import { toastr } from "react-redux-toastr"
import { offlineCheck } from "./offline"

export const tag = document.getElementById("root")



export const Renderer = (Component) => {
    const history = createBrowserHistory()
    const store = configureStore(history)
    offlineCheck(store)
    if ((window as any).__PRODUCTION__) {
        storage.createLoader(engine)(store)
            .then((newState) => { store.dispatch(newState.location) })
            .catch(() => console.log("Failed to load previous state"))
    }
    const boilMUI = getMuiTheme(BoilTheme, { userAgent: navigator.userAgent })
    ReactDOM.render(
        <ReduxProvider store={store}>
            <MuiThemeProvider muiTheme={boilMUI} >
                <AppContainer>
                    <Component />
                </AppContainer>
            </MuiThemeProvider>
        </ReduxProvider>, tag)
}
