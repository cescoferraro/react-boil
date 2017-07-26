import { redirect, NOT_FOUND } from 'redux-first-router'

const userThunk = (dispatch, getState) => {
    const { id } = getState().location.payload
    const { Offline } = (window as any)
    console.log("state")
    console.log(Offline.state)
    switch (Offline.state) {
        case "down":
            const action = ({ type: 'USER_FOUND' })
            dispatch(action)
        case "up":
            fetch('https://randomuser.me/api/')
                .then((data) => (data.json()))
                .then((data) => {
                    const user = data.results[0]
                    user.id = id
                    const action = ({ type: 'USER_FOUND', payload: { user } })
                    dispatch(action)
                })

    }
}


export const routesMap = {
    HOME: { path: "/" },
    USER: { path: "/user/:id", thunk: userThunk },
}
