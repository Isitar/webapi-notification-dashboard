import { json } from "stream/consumers";
import INotificationRepository from "../../domain/INotificationRepository";
import SqLiteNotificationRepository from "../../infrastructure/SqLiteNotificationRepository";

export interface IDiContainer {
    notificationRepository: INotificationRepository;
}

export class DiContainer {

    private static container: IDiContainer | null = null;
    private static build(): void {
        this.container = {
            notificationRepository: new SqLiteNotificationRepository(),
        };
    }

    public static getContainer(): IDiContainer {
        if (this.container === null) {
            this.build();
        }

        if (this.container === null) {
            throw new Error('Error building di container');
        }

        return this.container;
    }


}