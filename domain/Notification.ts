export type NotificationCategory = "ICT" | "SWE" | "DevOps" | "SOL" | "IBMi";

export default class Notification {
    public category: NotificationCategory;
    public ts: string;
    public title: string;


    constructor(category: NotificationCategory, ts: string, title: string) {
        this.category = category;
        this.ts = ts;
        this.title = title;
    }
}