import universal from "react-universal-component"
declare var System: any
import * as importCss from 'babel-plugin-universal-import/importCss.js'
import * as universalImport from 'babel-plugin-universal-import/universalImport.js'


declare var __dirname: any
export const AsyncUser = universal(
    universalImport({
        load: () => Promise.all([
            System.import(/* webpackChunkName: 'user' */ "./user"),
            importCss("user")]).then(promises => promises[0]),
        chunkName: () => "user",
        resolve: () => require.resolveWeak('./user'),
    })
)

