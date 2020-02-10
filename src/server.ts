/* 
    Applications maintains a queue of incoming text data (pdf/raw input),
    adds text to a queue of, to-be-parsed inputs,
    queue object setTimeout, dequeue text, parse,
    adds data the internal database
*/

import app from './app'

const port = process.env.PORT || 3000

app.httpServer.listen(port, (): void => { 
    console.info(`Server has started on port: ${port}`) 
});