import express, { Express, Request, Response } from 'express';
import Notification from '../domain/Notification';
import { IDiContainer } from './di/di';
import ICreateNotification from './requestObjects/ICreateNotification';

export default class WebServer {

    private diContainer: IDiContainer;

    constructor(diContainer: IDiContainer) {
        this.diContainer = diContainer;
    }

    public create(): Express {
        const app: Express = express();
        const port = process.env.PORT;


        app.use(express.json())


        app.post('/notifications', async (req: Request<ICreateNotification>, res: Response) => {
            const createReq = req.body;
            const notification = new Notification(createReq.category, createReq.ts, createReq.title);
            await this.diContainer.notificationRepository.addOrUpdateNotification(notification);
        })

        app.delete('/notifications', async (req: Request, res: Response) => {
            const title = req.query['title'];
            const deletedNotification = await this.diContainer.notificationRepository.deleteNotification(title);
            res.json(deletedNotification);
        })

        app.get('/notifications', async (req: Request, res: Response) => {
            const notifications = await this.diContainer.notificationRepository.notifications();
            res.json(notifications);
        })

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        });

        return app;
    }
}



