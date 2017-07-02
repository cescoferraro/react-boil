import { flushModuleIds } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { flushChunkNames } from 'react-universal-component/server'
import { flushFiles } from 'webpack-flush-chunks'

export const flushedAssets = (clientStats, outputPath) => {
    const moduleIds = flushModuleIds()
    const chunkNames = flushChunkNames()
    return {
        moduleIds,
        chunkNames,
        ...flushChunks(clientStats, {
            chunkNames,
            before: ['bootstrap'],
            after: ['main'],
            outputPath
        })
    }
}
