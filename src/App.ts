import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createServer, Server } from 'http'
import { router } from './routes/parseRouter'

class App {
    private express: express.Application;
    public httpServer: Server;

    constructor() {
        dotenv.config()
        this.express = express()
        this.httpServer = createServer(this.express)
        this.initMiddleware()
        this.initRoutes()
    }


    private initRoutes(): void {
        this.express.use(router)
    }

    private initMiddleware(): void {
        this.express.use(express.json())
        this.express.use(cors())
    }
}

export default new App()