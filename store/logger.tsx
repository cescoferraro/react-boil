import { createLogger } from 'redux-logger'

const beginsWith = function(needle, haystack) {
    return (haystack.substr(0, needle.length) == needle);
}

export const logger = createLogger({
    predicate: (getState, action) => {
        const identifier = "@@reactReduxFirebase"
        const fromFirebase = (action.type.substr(0, identifier.length) == identifier)
        return !fromFirebase
    }
})
