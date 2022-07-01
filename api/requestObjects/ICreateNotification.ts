import { NotificationCategory } from "../../domain/Notification";

export default interface ICreateNotification {
    category: NotificationCategory;
    ts: string;
    title: string;
    subTitle: string;
}