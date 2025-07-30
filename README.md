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
```bash
Request: POST /api/event
```
```json
Request Body:
{
  "title": "AI Conference 2025",
  "date": "2025-08-20T10:00:00.000Z",
  "location": "Mumbai",
  "capacity": 200
}

Response:
{
  "message": "Event created and creator registered successfully",
  "eventId": "eventId"
}
```

### 2. Register for an Event:
```bash
Request: POST /api/event/eventId
```
```json
Response:
{
  "message": "Successfully registered for the event"
}
```

### 3. Cancel Registration:
```bash
Request: DELETE /api/event/eventId
```
```json
Response:
{
  "message": "Registration cancelled"
}
```

### 4. Get Event Details
```bash
Request: GET /api/event/eventId/details
```
```json
Response

{
  "_id": "eventId",
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
```bash
Request: GET /api/event/upcoming
```
```json
Response:
[
  {
    "_id": "eventId",
    "title": "AI Conference 2025",
    "dateTime": "2025-08-20T10:00:00.000Z",
    "location": "Mumbai",
    "capacity": 200
  },
  {
    "_id": "eventId",
    "title": "Tech Meetup",
    "dateTime": "2025-09-10T14:00:00.000Z",
    "location": "Bangalore",
    "capacity": 150
  }
]
```

### 6. Get Event Stats
```bash
Request: GET /api/event/eventId/stats
```
```json
Response:
{
  "eventId": "eventId",
  "title": "Tech Conference 2025",
  "totalRegistrations": 56,
  "remainingCapacity": 144,
  "percentageUsed": "28%"
}
```
