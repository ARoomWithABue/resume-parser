import { PhraseGraph } from '../graph/MapGraph'

const phrases : Array<string> = [
    "Java",
    "Java Enterprise Certified",
    "Java Certified",
]

test('Test Graph Construction', () => {
    const g: PhraseGraph = new PhraseGraph(phrases)

    expect(() => {
        g.root.getChild('Java')
    }).toThrowError(new Error('Unable to get node. key: Java does NOT exist'))

    expect(() => {
        g.root.getChild('java')
    }).not.toThrow()

    expect(g.root.getChild('java')?.val).toBe('java')

    expect(g.root.getChild('java')?.getChild('enterprise')?.getChild('certified')?.val).toBe('certified')
})

test('Complete Phrase Search', () => {
    const g: PhraseGraph = new PhraseGraph(phrases)
    expect(g.searchCompletePhrase('Java Enterprise Certified')).toBe(true)
    expect(g.searchCompletePhrase('Java Certified')).toBe(true)
    expect(g.searchCompletePhrase('Java Certified Enterprise')).toBe(false)
})