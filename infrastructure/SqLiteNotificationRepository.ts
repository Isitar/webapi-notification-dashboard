
import { open, IMigrate, Database, Statement } from 'sqlite'
import { Database as sqlite3Db, Statement as sqlite3Sm } from 'sqlite3';
import INotificationRepository from "../domain/INotificationRepository";
import Notification from "../domain/Notification";

export default class SqLiteNotificationRepository implements INotificationRepository {

    private db: Database | undefined;

    private async ensureCreated() {
        if (this.db === undefined) {
            console.log('creating db');


            this.db = await open<sqlite3Db, sqlite3Sm>({
                filename: 'database.db',
                driver: sqlite3Db,
            });

            await this.db.migrate({
                migrationsPath: 'infrastructure/migrations',
                table: 'migrations'
            });
        }

    }


    public async notifications(): Promise<Notification[]> {
        await this.ensureCreated();
        const notifications = await  this.db!.all<Notification[]>("SELECT category, ts, title FROM notifications");
        return notifications;
    }
    public async notification(title: string): Promise<Notification|undefined> {
        await this.ensureCreated();
        const notification = await this.db!.get<Notification>("SELECT category, ts, title FROM notifications WHERE title = ?", title);
        return notification!;
    }
    public async addOrUpdateNotification(notification: Notification): Promise<void> {
        await this.ensureCreated();
        const dbNotification = await this.notification(notification.title);
        console.log(notification,dbNotification)
        if (dbNotification === undefined) {
            await this.db!.run("INSERT INTO notifications (category, ts, title) VALUES (?, ?, ?)", notification.category, notification.ts, notification.title);
        } else {
            await this.db!.run("UPDATE notifications SET category = ?, ts = ? WHERE title = ?", notification.category, notification.ts, notification.title);
        }
    }
    public async deleteNotification(title: string): Promise<Notification> {
        await this.ensureCreated();
        const dbNotification = await this.notification(title);
        if (dbNotification === undefined) {
            throw new Error('notificaiton not found');
        }

        await this.db!.run("DELETE FROM notifications WHERE title = ?", title);


        return dbNotification;
    }

}