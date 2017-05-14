import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from 'react-hot-loader';
import { PostCSSProvider } from "../shared/components/styles.context";
import { Provider as ReduxProvider } from "react-redux";
import { ConnectedRouter as ReduxRouterProvider } from "connected-react-router";
import { createBrowserHistory } from "history";
import { AsyncComponentProvider } from 'react-async-component'
import { MaterialUI } from "../shared/components/materialui";

export const tag = document.getElementById("root")

export const Renderer = (Component, store, history) => {
    return (
        <PostCSSProvider onInsertCss={styles => styles._insertCss()}>
            <ReduxProvider store={store}>
                <MaterialUI userAgent={navigator.userAgent}>
                    <ReduxRouterProvider history={history}>
                        <AppContainer>
                            <Component />
                        </AppContainer>
                    </ReduxRouterProvider>
                </MaterialUI>
            </ReduxProvider>
        </PostCSSProvider >
    )
}
