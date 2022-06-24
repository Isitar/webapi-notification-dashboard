import express, { Express, Request, Response } from 'express';
import Notification from '../domain/Notification';
import { IDiContainer } from './di/di';
import ICreateNotification from './requestObjects/ICreateNotification';
import http from 'http';
import WebSocket from 'ws';

import cors from 'cors';

export default class WebServer {

    private diContainer: IDiContainer;

    constructor(diContainer: IDiContainer) {
        this.diContainer = diContainer;
    }



    public create(): http.Server {
        const app: Express = express();
        const port = process.env.PORT ?? 80;

        app.use(express.json())
        app.use(cors());


        app.get('/notifications', async (req: Request, res: Response) => {
            const notifications = await this.diContainer.notificationRepository.notifications();
            res.json(notifications);
        })


        const server = http.createServer(app);
        const wss = new WebSocket.Server({ server });

        wss.on('connection', (ws: WebSocket) => {
            console.log('someone connected');
            ws.send('welcome');
        })

        app.post('/notifications', async (req: Request<ICreateNotification>, res: Response) => {
            const createReq = req.body;
            const notification = new Notification(createReq.category, createReq.ts, createReq.title);
            if (await this.diContainer.notificationRepository.addOrUpdateNotification(notification)) {
                wss.clients.forEach(c => {
                    c.send('created: ' + JSON.stringify(notification));
                })
            } else {
                wss.clients.forEach(c => {
                    c.send('updated: ' + JSON.stringify(notification));
                })
            }
        })


        app.delete('/notifications', async (req: Request, res: Response) => {
            const title = req.query['title'] as string;
            try {
                const deletedNotification = await this.diContainer.notificationRepository.deleteNotification(title);
                wss.clients.forEach(c => {
                    c.send('deleted: ' + JSON.stringify(deletedNotification));
                })
                res.json(deletedNotification);
            } catch {
                res.sendStatus(404);
            }

        })

        server.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        });


        return server;
    }
}



