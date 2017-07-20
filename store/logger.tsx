import { createLogger } from 'redux-logger'

const beginsWith = function(needle, haystack) {
    return (haystack.substr(0, needle.length) == needle);
}
export const isServer = () => !(typeof window !== "undefined" && window.document)


export const logger = createLogger({
    collapsed: (getState, action, logEntry) => { return !logEntry.error },
})
