# Resume Parser

## Basic Steps

* Uses an in memory trie to store key words
* Accepts https requests with resume body
* Parses text and returns an array of unique keywords discovered from the in memory trie

## Practical Design
* Trie would be serialized in a database optimized for retrieval using the fewest queries possible.
* Incoming http requests would enqueue text for later processing
* Queue would dequeue text, decode it, process, and then store it in a database for later correlation
* Application would sit behind the firewall, would token authurize requests
* Setup service to horizontally scaled and load balance based off incoming request load
* Router would accept PDFs as well as text

## Near Term TODOs

1. Setup docker for quick testing
2. More verbose unit testing