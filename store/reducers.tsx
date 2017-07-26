import { combineReducers } from "redux"
import { reducer as toastrReducer } from 'react-redux-toastr'


import { NOT_FOUND } from 'redux-first-router'
import { DRAWER_ACTION_NAME, DRAWER_TOGGLE_ACTION_NAME } from "./actions";
export const userIdReducer = (state = null, action: any = {}) => {
    switch (action.type) {
        case 'HOME':
        case NOT_FOUND:
            return null
        case 'USER':
            return action.payload.id
        case 'USER_FOUND':
            console.log(action.payload)
            return action.payload.user.id
        default:
            return state
    }
}

export const profileReducer = (state = {
    cell: "(057)-526-3510",
    dob: "1986-08-29 16:48:32",
    email: "gabriel.mathieu@example.com",
    gender: "male",
    id: 123,
    location:
    {
        city: "pully",
        postcode: 8831,
        state: "graubünden",
        street: "2976 quai charles-de-gaulle",

    },

    login: {
        md5: "07ad5b07047398a92de1ec6a9b65f7af",
        password: "leonardo",
        salt: "zYa8DyXr",
        sha1: "0a4d1a3a4eae579dfa25a0f2e5fd9a265d7e1cd0",
        sha256: "397fde48397adf6f350642cad79ed8f41a4ff0e22c3007fc90537d9c394141f0",
        username: "crazymouse692"
    },
    name: {
        first: "gabriel",
        last: "mathieu",
        title: "monsieur"
    },
    nat: "CH",
    phone: "(009)-085-3186",
    picture: {
        large: "https://randomuser.me/api/portraits/men/68.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/68.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/68.jpg",
    },
    registered: "2013-02-04 00:12:29"
}, action: any = {}) => {
    switch (action.type) {
        case 'USER_FOUND':
            return action.payload.user
        default:
            return state
    }
}
export const drawer = (state = false, action: any = {}) => {
    switch (action.type) {
        case DRAWER_TOGGLE_ACTION_NAME:
            return !state
        case DRAWER_ACTION_NAME:
            return action.payload
        default:
            return state
    }
}

export let allReducers = (location) => combineReducers({
    location,
    toastr: toastrReducer,
    userId: userIdReducer,
    profile: profileReducer,
    drawer
})
