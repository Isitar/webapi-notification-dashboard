export type NotificationCategory = "ICT" | "SWE" | "DevOps" | "SOL" | "IBMi";

export default class Notification {
    public category: NotificationCategory;
    public ts: string;
    public title: string;
    public subTitle: string;


    constructor(category: NotificationCategory, ts: string, title: string, subTitle: string) {
        this.category = category;
        this.ts = ts;
        this.title = title;
        this.subTitle = subTitle;
    }
}