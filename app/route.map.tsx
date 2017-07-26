import { redirect } from 'redux-first-router'
import { profileStartup } from "../store/reducers"
import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/if'

const userThunk = (dispatch, getState) => {
    const { id } = getState().location.payload
    const { Offline } = (window as any)
    Offline.check()
    Observable.of(Offline.state)
        .delay(new Date(Date.now() + 100))
        .flatMap((state) => Observable.of(Offline.state))
        .flatMap((state) => (
            Observable.if(
                () => (state === "up" ? true : false),
                Observable.ajax("https://randomuser.me/api")
                    .map((user) => (user.response.results[0]))
                    .map((user) => {
                        user.id = id
                        console.log(getState())
                        dispatch({ type: 'USER_FOUND', payload: { user } })
                    }),
                Observable.of(profileStartup)
                    .map((user) => {
                        user.id = id
                        dispatch({ type: 'USER_FOUND', payload: { user } })
                    })
            )))
        .subscribe((success) => {
            console.log("done")
        })

}


export const routesMap = {
    HOME: { path: "/" },
    USER: { path: "/user/:id", thunk: userThunk },
}
