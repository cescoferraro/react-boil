
const upHandler = (e) => {
    /* toastr.success("The UP", "cloud 9", {*/
    /* position: "bottom-left"*/
    /* })*/
    console.log("upppp")
}
const downHandler = (e) => {
    /* toastr.error("The down", "rot in hell", {*/
    /* position: "bottom-left"*/
    /* })*/
    console.log("downnnnn")
}

export const offlineCheck = (store) => {
    const { Offline } = (window as any)
    Offline.options = {
        checkOnLoad: true,
        checks: {
            image: {
                url: () => ("https://esri.github.io/offline-editor-js/tiny-image.png?_="
                    + (Math.floor(Math.random() * 1000000000)))

            },
            active: "image"
        }
    }
    Offline.on("up", upHandler)
    Offline.on("down", downHandler)
}
