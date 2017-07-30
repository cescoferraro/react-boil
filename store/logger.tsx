import { createLogger } from "redux-logger"

/* const beginsWith = (needle, haystack) => {*/
/* return (haystack.substr(0, needle.length) === needle)*/
/* }*/

export const isServer = () => !(typeof window !== "undefined" && window.document)

export const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    predicate: (getState, action) => {
        return !isServer()
    }
})
