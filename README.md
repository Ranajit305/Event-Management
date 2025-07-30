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
