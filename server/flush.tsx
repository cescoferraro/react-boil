import { flushModuleIds } from "react-universal-component/server"
import flushChunks from "webpack-flush-chunks"
import { flushChunkNames } from "react-universal-component/server"

export const flushedAssets = (clientStats, outputPath, production) => {
    const moduleIds = flushModuleIds()
    const chunkNames = flushChunkNames()
    return {
        moduleIds,
        chunkNames,
        ...flushChunks(clientStats, {
            chunkNames,
            before: production ? ["bootstrap", "vendor"] : ["bootstrap"],
            after: ["main"],
            outputPath
        })
    }
}
