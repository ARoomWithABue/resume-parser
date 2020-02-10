import express from 'express'

import KeyPhraseParser from '../parser/KeyPhraseParser'
import { PhraseGraph } from '../graph/MapGraph'
import phrases from '../config/config.graph'

export const router: express.Router = express.Router()
const graph: PhraseGraph = new PhraseGraph(phrases)
const parser: KeyPhraseParser = new KeyPhraseParser(graph)

// TODO: middleware authentication
// TODO: santize input
// TODO: reorg, move parse logic to another queue class to distribute load


// setup queue for incoming resume

// route that takes text and enqueues it
router.post('/queue', (req, res) => {
    try {
        const text = Buffer.from(req.body.text, 'base64')
        const keywords = parser.parse(text.toString('utf-8'))
        res.status(200).json({ message: "success", keywords: JSON.stringify([...keywords]) })
    } catch(e) {
        console.error(e)
        res.status(500).json({ error: "unexpected error while parsing"})
    }
})


// route that takes url to pdf

// route that takes data buffer

