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
            return action.payload.user.id
        default:
            return state
    }
}
interface Location {
    city: string
    postcode: number
    state: string
    street: string
}
interface Login {
    md5: string
    password: string
    salt: string
    sha1: string
    sha256: string
    username: string

}
interface Name {
    first: string
    last: string
    title: string
}
interface Picture {
    thumbnail: string
    medium: string
    large: string
}

export interface Profile {
    cell: string
    dob: string
    email: string
    gender: string
    id: number
    location: Location
    login: Login
    name: Name
    nat: string
    phone: string
    registered: string
    picture: Picture
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export class ProfileClass implements Profile {
    cell: string
    dob: string
    email: string
    gender: string
    id: number
    location: Location
    login: Login
    name: Name
    nat: string
    phone: string
    registered: string
    picture: Picture
    constructor(obj: Profile) {
        this.cell = obj.cell
        this.dob = obj.dob
        this.email = obj.email
        this.gender = obj.gender
        this.id = obj.id
        this.location = obj.location
        this.login = obj.login
        this.name = obj.name
        this.nat = obj.nat
        this.phone = obj.phone
        this.registered = obj.registered
        this.picture = obj.picture
    }
    fullname() {
        return capitalizeFirstLetter(this.name.title) +
            " " +
            capitalizeFirstLetter(this.name.first) +
            " " +
            capitalizeFirstLetter(this.name.last)
    }
}
export const profileStartup: Profile = {
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
        first: "John",
        last: "Doe",
        title: "Mr."
    },
    nat: "BR",
    phone: "(009)-085-3186",
    picture: {
        large: "https://randomuser.me/api/portraits/men/68.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/68.jpg",
        thumbnail: "http://via.placeholder.com/150x150",
    },
    registered: "2013-02-04 00:12:29"
}
export const profileReducer = (state = profileStartup, action: any = {}) => {
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

export const profilesReducer = (state = {}, action: any = {}) => {
    switch (action.type) {
        case 'USER_FOUND':
            console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]")
            console.log(action.payload)
            let Newer = state
            Newer[action.payload.user.id] = action.payload.user
            return Newer
        default:
            return state
    }
}
export let allReducers = (location) => combineReducers({
    location,
    toastr: toastrReducer,
    userId: userIdReducer,
    profile: profileReducer,
    profiles: profilesReducer,
    drawer
})
