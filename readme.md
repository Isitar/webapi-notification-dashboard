# Simple notification dashboard api

## Api doc


### Read notifications
```
HTTP GET /notifications
```
Gets all notifications, the following structure is used:
```
{"category":"ICT","ts":"2022-01-01T00:00:00Z","title":"Host ICT down"}
```

### Create notifications
```
HTTP POST /notifications
{"category":"ICT","ts":"2022-01-01T00:00:00Z","title":"Host ICT down"}
```
Inserts a new notification or updates an existing one with the same title

### Delete notification

```
HTTP DELETE /notifications?title=123
```
Deletes the notification with title `123`


## Websocket

ws://localhost:8000

sends a message with the following structure if a new notification is created:

```
created: {"category":"ICT","ts":"2022-01-01T00:00:00Z","title":"Host ICT down"}
```

sends a message with the following structure if a notification is deleted:
```
deleted: {"category":"ICT","ts":"2022-01-01T00:00:00Z","title":"Host ICT down"}
```


