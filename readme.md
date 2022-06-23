# Simple notification dashboard api

## Api doc

- HTTP GET /notifications | gets all the notifications
- HTTP POST /notifications | inserts a  notification
- HTTP DELETE /notifications?title=123 | deletes the notification with title 123

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


