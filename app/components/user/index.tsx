import universal from "react-universal-component"
declare var System: any

export const AsyncUser = universal(
    () => System.import(/* webpackChunkName: 'user' */ "./user"),
    { chunkName: "user" }
)
