import * as _ from 'lodash'

// NOTE: Lodash doesn't have a sorted object removal function
// NOTE: Alternative design, this.children is a Map instead of an array


// deprecated use MapGraph.ts more efficient

export class GraphNode<T> {
    public static NULL_NODE: GraphNode<any> = new GraphNode<any>(null) 

    public constructor(
        public val: T,
        public isFullSearch = false,
        public children: GraphNode<T>[] = [], //pre-sorted children
    ) {
        this.val = val

        // QUESTION: should check sort? Or should auto sort?

        this.children = children
    }

    public getChild(n: number): GraphNode<T> {
        if(n < 0 || n > this.children.length)
            throw new Error(`Node: ${this.val}, has no children`)
        return this.children[n]
    }

    public addChildByNode(node: GraphNode<T>): void {
        const index = _.sortedIndexBy(this.children, node, (o) => {
            return o.val
        })
        this.children.splice(index, 0, node)
    }

    public addChildByValue(val: T, isFullSearch = false): void {
        const node = new GraphNode<T>(val, isFullSearch)
        this.addChildByNode(node)
    }

    // TODO: removal in O(n) time, optimize binary removal
    public removeChildByNode(node: GraphNode<T>): boolean {
        const removed = _.remove(this.children, (o) => {
            return o.val === node.val
        })

        return removed.length > 0
    }

    // TODO: space complexity O(size(GraphNode<T>)), optimize
    public removeChildByValue(val: T): boolean {
        const node = new GraphNode<T>(val)
        return this.removeChildByNode(node)
    }

    public findNodeByValue(val: T): [boolean, GraphNode<T> | null] {
        

        let node = this.binarySearch(val)

        return [
            node !== null, 
            (node) ? node : GraphNode.NULL_NODE
        ]
    }

    private binarySearch(val: T): GraphNode<T> | null {
        let start, end = this.children.length

        while(start <= end) {
            let mid = Math.floor((start + end) / 2)

            if(this.children[mid].val === val)
                return this.children[mid]
            else if(this.children[mid].val < val)
                start = mid + 1
            else
                start = mid - 1
        }

        return null
    }
}

export class Graph<T> { }
