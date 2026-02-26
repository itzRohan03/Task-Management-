# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Register User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation Rules:**
- `name`: Required, not empty
- `email`: Required, valid email format, must be unique
- `password`: Required, minimum 6 characters
- `passwordConfirm`: Required, must match password

---

### 2. Login User

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Get Current User

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Task Endpoints

### 1. Create Task

**Endpoint:** `POST /tasks`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete project report",
  "description": "Finish writing the quarterly report and submit",
  "priority": "high",
  "dueDate": "2026-03-15",
  "status": "todo"
}
```

**Response (201 Created):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project report",
    "description": "Finish writing the quarterly report and submit",
    "priority": "high",
    "status": "todo",
    "dueDate": "2026-03-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2026-02-26T10:30:00.000Z",
    "updatedAt": "2026-02-26T10:30:00.000Z"
  }
}
```

**Fields:**
- `title`: Required, string
- `description`: Optional, string
- `priority`: Optional, enum: ["low", "medium", "high"] (default: "medium")
- `dueDate`: Optional, ISO date string
- `status`: Optional, enum: ["todo", "in-progress", "completed"] (default: "todo")

---

### 2. Get All Tasks

**Endpoint:** `GET /tasks`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project report",
      "description": "Finish writing the quarterly report and submit",
      "priority": "high",
      "status": "todo",
      "dueDate": "2026-03-15T00:00:00.000Z",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2026-02-26T10:30:00.000Z",
      "updatedAt": "2026-02-26T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Review code",
      "description": "Review pull requests from team members",
      "priority": "medium",
      "status": "in-progress",
      "dueDate": "2026-02-28T00:00:00.000Z",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2026-02-25T14:20:00.000Z",
      "updatedAt": "2026-02-26T09:15:00.000Z"
    }
  ]
}
```

**Note:** Tasks are returned in reverse chronological order (newest first)

---

### 3. Get Single Task

**Endpoint:** `GET /tasks/:id`

**Parameters:**
- `id`: Task ID (MongoDB ObjectId)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project report",
    "description": "Finish writing the quarterly report and submit",
    "priority": "high",
    "status": "todo",
    "dueDate": "2026-03-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2026-02-26T10:30:00.000Z",
    "updatedAt": "2026-02-26T10:30:00.000Z"
  }
}
```

**Error (404 Not Found):**
```json
{
  "message": "Task not found"
}
```

**Error (403 Forbidden):**
```json
{
  "message": "Not authorized"
}
```

---

### 4. Update Task

**Endpoint:** `PUT /tasks/:id`

**Parameters:**
- `id`: Task ID (MongoDB ObjectId)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "title": "Complete project report - URGENT",
  "description": "Updated description",
  "priority": "high",
  "status": "in-progress",
  "dueDate": "2026-03-10"
}
```

**Response (200 OK):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project report - URGENT",
    "description": "Updated description",
    "priority": "high",
    "status": "in-progress",
    "dueDate": "2026-03-10T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2026-02-26T10:30:00.000Z",
    "updatedAt": "2026-02-26T11:45:00.000Z"
  }
}
```

---

### 5. Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Parameters:**
- `id`: Task ID (MongoDB ObjectId)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```
or
```json
{
  "message": "Invalid token"
}
```

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email"
    }
  ]
}
```

### 500 Server Error
```json
{
  "message": "Error message describing what went wrong"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - User not authorized to access resource |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Usage Examples

### Example 1: Complete Authentication Flow

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get current user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

### Example 2: Task Management Flow

```bash
# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "priority": "medium",
    "dueDate": "2026-03-01"
  }'

# Get all tasks
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token>"

# Update task
curl -X PUT http://localhost:5000/api/tasks/<task_id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'

# Delete task
curl -X DELETE http://localhost:5000/api/tasks/<task_id> \
  -H "Authorization: Bearer <token>"
```

---

## Token Format

Tokens are JWT (JSON Web Tokens) that expire after **7 days**.

**Token Structure:**
```
header.payload.signature
```

**Payload Example:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "iat": 1677228600,
  "exp": 1677833400
}
```

Store the token in localStorage on the client side and include it in all subsequent API calls.
