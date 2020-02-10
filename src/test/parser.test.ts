import KeyPhraseParser from '../parser/KeyPhraseParser'
import { PhraseGraph } from '../graph/MapGraph'
import phrases from '../config/config.graph'
import fs from 'fs'

const expectedOutput = [
    "decentralized",
    "microservice",
    "blockchain",
    "microservice architectures",
    "nodejs",
    "express",
    "c++",
    "iap",
    "ios",
    "android",
    "jquery",
    "javascript",
    "sql",
    "microsoft server 2012",
    "a+",
    "a+ certification",
    "hti",
    "net+",
    "mcse",
    "ccna",
    "software",
    "software engineer",
    "python",
    "api",
    "c",
    "eosio",
    "eosio based blockchains",
    "graphql",
    "travis ci"
]

const text = fs.readFileSync(`${__dirname}/resumes/resume.txt`, 'utf-8')

const graph: PhraseGraph = new PhraseGraph(phrases)
const parser: KeyPhraseParser = new KeyPhraseParser(graph)

test('Check parsing output', () => {
    expect(Array.from(parser.parse(text)).sort()).toStrictEqual(expectedOutput.sort())
})