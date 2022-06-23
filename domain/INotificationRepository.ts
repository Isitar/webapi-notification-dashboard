import Notification from "./Notification";

export default interface INotificationRepository {

    notifications(): Promise<Notification[]>;
    notification(title: string): Promise<Notification | undefined>;

    addOrUpdateNotification(notification: Notification): Promise<void>;
    deleteNotification(title: string): Promise<Notification>;

}