import { PhraseGraph, GraphNode } from '../graph/MapGraph'
import { Graph } from '../graph/ArrayGraph'

export default class KeyPhraseParser {
    
    public constructor(
        private graph: PhraseGraph
    ) {
        this.graph = graph
    }

    // takes pre-santized data
    // returns an array of match phrases from text
    public parse(text: string): Set<string> {
        const words = text.split(/(\s+)/)
        let output: Set<string> = new Set<string>()
        for(let i = 0; i < words.length; i++) {
            if(i % 2 == 0) {
                let o = []
                this.parsePhrase(i, words, this.graph.root, "", o)
                if(o.length > 0) {
                    for(const phrase of o) {
                        output.add(phrase)
                    }
                }
            }
        }

        return output
    }

    private getWord(i: number, words: Array<string>): string {
        // TODO: remove some seperators from regex
        // TODO: check if word contains a seperator
        return words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().trim()
    }

    private parsePhrase(i: number, arr: Array<string>, node: GraphNode, phrase: string, output: Array<string>): void {
        const word: string = this.getWord(i, arr)
        
        if(node.isComplete) {
            output.push(phrase)
        }
            

        if(node.hasChild(word)) {
            phrase += (phrase === '') ? word : ' ' + word
            // console.log(`i: ${i}`)
            // console.log(`word in graph: ${word}`)
            // console.log(`current phrase: ${phrase}`)
            const next = node.getChild(word)
            if(next) {
                this.parsePhrase(i + 2, arr, next, phrase, output)
            }
        }
    }
}