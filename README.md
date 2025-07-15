# 🗂️ Personal Task Manager API

A secure, production-ready REST API built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL** using **Sequelize ORM** — allowing users to manage their personal tasks with authentication, filtering, and sorting features.

---

## 🚀 Features

- 🔐 JWT-based Authentication
- 🧩 Modular & Scalable Structure
- 📝 Task Management (CRUD)
- 🕵️ Filter/Sort by priority, due dates, and status
- 🛡 Auth-Guarded Endpoints (creator access only)
- 🚦 Rate Limiting to prevent abuse

---

## 📦 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Backend     | Node.js, Express, TypeScript     |
| ORM         | Sequelize (PostgreSQL)           |
| Auth        | JWT, bcrypt                      |
| Middleware  | express-rate-limit, dotenv       |
| Dev Tools   | nodemon, ts-node-dev             |

---

## 📁 Project Structure
```
├── src/
│ ├── config/ # Sequelize config
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Auth, rate limit
│ ├── models/ # Sequelize models
│ ├── routes/ # API route definitions
│ ├── services/ # Business logic (optional)
│ ├── app.ts # Express entry
│ └── server.ts # Server startup
├── .env
├── tsconfig.json
├── package.json
└── README.md
```


## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
```

### 2. Configure Environment 

Create a `.env` file:

```bash
PORT=5000
POSTGRESQL_URI=your_neon_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the Server

```bash
npm run dev   # for development
npm run build && npm start   # for production
```

### 📘 API Endpoints
#### 🔐 Authentication

- Method	Endpoint	Description
```http
POST	/auth/register	Register a user
POST	/auth/login	Login & get token
```
- ✅ Tasks (Protected)
```http
All /tasks/* routes require a valid token in the Authorization header.
```
- Create Task
```http
POST /tasks
```

```json
{
  "title": "Finish project",
  "description": "Complete backend logic",
  "priority": "high",
  "dueDate": "2025-07-16T00:00:00.000Z",
  "status": "pending"
}
```
- Get All Tasks (with filters/sorting)
```http
GET /tasks?priority=high&status=pending&sortBy=dueDate&sortOrder=asc
```

- Get Task by ID
```http
GET /tasks/:id
```

- Update Task
```http
PUT /tasks/:id
```

```json
{
  "title": "Updated Title",
  "status": "completed"
}
```
- Delete Task
```http
DELETE /tasks/:id
```

### 🛡 Rate Limiting
Login & register routes are limited to 5 requests per minute per IP.
Blocked users will be restricted for 1 hour after hitting the limit.

