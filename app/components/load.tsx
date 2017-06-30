import universal from "react-universal-component"

export const UniversalComponent = universal(() => import("./product"), {
    resolve: () => require.resolveWeak("./product"),
    chunkName: "Universla",
    onError: (erros) => {
        console.log(erros)
    }
})
