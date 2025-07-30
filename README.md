#  Event Registration API

A simple Node.js + Express REST API for managing event creation, user registrations, and statistics using MongoDB.

---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/event-registration-api.git
```

### 2. Install dependencies: 
```bash
npm install
```

### 3. Environment variables: 
```bash
PORT=your_port
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 4. Start the server: 
```bash
npm run dev
```

## API Description

### 1. Authentication Routes (/api/user):

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Login and get token  |
| POST   | `/logout`   | Logout (clear token) |

### 2. Event Routes (/api/event):

| Method | Endpoint                   | Description                                |
| ------ | -------------------------- | ------------------------------------------ |
| POST   | `/` (protected)            | Create a new event (auto-register creator) |
| GET    | `/`                        | Get all events with user list              |
| POST   | `/:eventId` (protected)    | Register for an event                      |
| DELETE | `/:eventId` (protected)    | Cancel event registration                  |
| GET    | `/upcoming`                | List upcoming events                       |
| GET    | `/:eventId`                | Get event stats                            |

## Requests & Responses

### 1. Create an Event:
```json
Request:
{
  "title": "AI Conference 2025",
  "date": "2025-08-20T10:00:00.000Z",
  "location": "Mumbai",
  "capacity": 200
}

Response:
{
  "message": "Event created and creator registered successfully",
  "eventId": "64bfc80ab1f245321e889999"
}
```

### 2. Register for an Event:

Request: POST /api/events/64bfc80ab1f245321e889999
```json
Response:
{
  "message": "Successfully registered for the event"
}
```

### 3. Cancel Registration:

Request: DELETE /api/events/64bfc80ab1f245321e889999
```json
Response:
{
  "message": "Registration cancelled"
}
```

### 4. Get Event Details

Request: GET /api/events/64bfc80ab1f245321e889999
```json
Response

{
  "_id": "64bfc80ab1f245321e889999",
  "title": "AI Conference 2025",
  "dateTime": "2025-08-20T10:00:00.000Z",
  "location": "Mumbai",
  "capacity": 200,
  "registrations": [
    {
      "_id": "64bfc012ab234a8e21973b01",
      "username": "john",
      "email": "john@example.com"
    }
  ]
}
```

### 5. List Upcoming Events

Request: GET /api/events/upcoming
```json
Response:
[
  {
    "_id": "64bfc80ab1f245321e889999",
    "title": "AI Conference 2025",
    "dateTime": "2025-08-20T10:00:00.000Z",
    "location": "Mumbai",
    "capacity": 200
  },
  {
    "_id": "64bfc91ab2a123321e889888",
    "title": "Tech Meetup",
    "dateTime": "2025-09-10T14:00:00.000Z",
    "location": "Bangalore",
    "capacity": 150
  }
]
```

### 6. Get Event Stats

Request: GET /api/events/64bfc80ab1f245321e889999/stats
```json
Response:
{
  "totalRegistrations": 56,
  "remainingCapacity": 144,
  "percentageUsed": "28%"
}
```
