import universal from "react-universal-component"
declare var System: any

export const UniversalComponent = universal(
    () => System.import(/* webpackChunkName: 'Product' */ "./product"),
    {
        resolve: () => require.resolveWeak("./product"),
        chunkName: "Product",
        onError: (erros) => {
            console.log(erros)
        }
    }
)
