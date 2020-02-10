export class GraphNode {
    public constructor(
        public val: string,
        public isComplete = false,
        private children: Map<string, GraphNode> = new Map<string, GraphNode>(), //pre-sorted children
    ) {
        this.val = val
        this.isComplete = isComplete
        this.children = children
    }

    public getChild(key: string): GraphNode | undefined {
        if(this.children.has(key))
            return this.children.get(key)

        throw new Error(`Unable to get node. key: ${key} does NOT exist`)
    }

    public hasChild(key: string): boolean {
        return this.children.has(key)
    }

    public addChild(val: string, isComplete = false): GraphNode {
        const node = new GraphNode(val, isComplete)
        if(!this.children.has(val))
            this.children.set(val, node)
        else
            throw new Error(`Unable to add node, key: ${val} already exists`)

        return node
    }

    public removeChild(key: string): boolean {
        if(!this.children.has(key))
            throw new Error(`Unable to remove node, key: ${key}, does NOT exist`)
        else
            this.children.delete(key)

        return !this.children.has(key)
    }

    public isLeaf(): boolean {
        return this.children.size > 0
    }
}

export class PhraseGraph {
    public root: GraphNode
    public constructor(
        phrases: Array<string>
    ) {
        this.root = new GraphNode('')
        this.constructGraph(phrases, this.root)
    }

    private constructGraph(phrases: Array<string>, root: GraphNode): void {
        for(const phrase of phrases) {
            this.insertPhrase(phrase, root)
        }
    }

    private insertPhrase(phrase: string, node: GraphNode): void {
        const words = phrase.toLowerCase().split(' ')
        let current : GraphNode | undefined = node
        for(let i = 0; i < words.length; i++) {
            const word = words[i]
            if(current && current.hasChild(word)) {
                current = current.getChild(word)
            } else if(current) {
                current = current.addChild(word, i === (words.length - 1))
            }
        }
    }

    public searchCompletePhrase(phrase): boolean {
        let current: GraphNode | undefined = this.root
        const words = phrase.toLowerCase().split(' ')
        for(let i = 0; i < words.length; i++) {
            const word = words[i]
            if(current?.hasChild(word)) {
                current = current.getChild(word)
            } else {
                return false
            }
        }
        return current !== undefined && current?.isComplete
    }
}
