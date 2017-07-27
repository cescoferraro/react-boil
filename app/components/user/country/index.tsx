import universal from "react-universal-component"
declare var System: any

export const AsyncCountry = universal(
    () => System.import(/* webpackChunkName: 'country' */ "./country"),
    {
        chunkName: "country"
    }
)
