import universal from "react-universal-component"
declare var System: any

export const UniversalComponent = universal(
    () => System.import(/* webpackChunkName: 'Product' */ "./Product"),
    {
        resolve: () => require.resolveWeak("./Product"),
        chunkName: "Product"
    }
)
