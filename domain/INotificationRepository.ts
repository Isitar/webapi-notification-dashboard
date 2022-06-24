import Notification from "./Notification";

export default interface INotificationRepository {

    notifications(): Promise<Notification[]>;
    notification(title: string): Promise<Notification | undefined>;

    /**
     * 
     * @param notification the notification to be inserted or updated
     * @returns true if inserted, false otherwise
     */
    addOrUpdateNotification(notification: Notification): Promise<boolean>;
    deleteNotification(title: string): Promise<Notification>;

}