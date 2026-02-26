# Task Management Application

A full-stack Task Management application built with Node.js backend and React frontend using MongoDB for data storage and JWT for authentication.

## Project Structure

```
Task Management App/
├── backend/                    # Node.js Express server
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD operations
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   └── tasks.js           # Task endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Main server file
│
└── frontend/                   # React application
    ├── public/
    │   └── index.html         # HTML entry point
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.js    # Task creation/edit form
    │   │   └── TaskList.js    # Task display component
    │   ├── pages/
    │   │   ├── Register.js    # Registration page
    │   │   ├── Login.js       # Login page
    │   │   └── Dashboard.js   # Main dashboard
    │   ├── services/
    │   │   └── api.js         # API service with axios
    │   ├── styles/
    │   │   ├── index.css      # Global styles
    │   │   ├── auth.css       # Auth pages styling
    │   │   ├── dashboard.css  # Dashboard styling
    │   │   ├── taskform.css   # Form styling
    │   │   └── tasklist.css   # Task list styling
    │   ├── App.js             # Main app component
    │   └── index.js           # React entry point
    ├── .env                   # Environment variables
    ├── package.json
    └── .gitignore
```

## Features

- **User Authentication**: Register and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, priority (low/medium/high), status (todo/in-progress/completed), and due date
- **Responsive Design**: Works on desktop and mobile devices
- **Secure API**: All task endpoints require authentication
- **Data Persistence**: MongoDB for all data storage

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (credentials already provided in .env)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with:
   - MongoDB URI
   - JWT Secret
   - Port (5000)

4. Start the backend server:
```bash
npm start
```

For development with auto-reload (requires nodemon):
```bash
npm install --save-dev nodemon
npm run dev
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with:
   - API URL: `http://localhost:5000/api`

4. Start the React development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Running the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password, passwordConfirm }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  
- `GET /api/auth/me` - Get current user (requires auth token)

### Tasks

All task endpoints require authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

- `POST /api/tasks` - Create a new task
  - Body: `{ title, description, priority, dueDate, status }`
  
- `GET /api/tasks` - Get all tasks for the logged-in user
  
- `GET /api/tasks/:id` - Get a specific task
  
- `PUT /api/tasks/:id` - Update a task
  - Body: `{ title, description, priority, dueDate, status }`
  
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://Assignment022026:rohan123@codecampcluster0.3hxzs.mongodb.net/?appName=codecampCluster0
JWT_SECRET=rohaninternprojectsecretkey123
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## User Flow

1. **Registration**: Create a new account
2. **Login**: Sign in with email and password
3. **Dashboard**: View all your tasks
4. **Create Task**: Add a new task with title, description, priority, and due date
5. **Edit Task**: Click "Edit" to modify a task
6. **Delete Task**: Remove a task (confirmation required)
7. **Logout**: Sign out of your account

## Features Breakdown

### Task Management
- Create tasks with title, description, priority level, status, and due date
- View all your tasks in a grid layout
- Edit existing tasks
- Delete tasks with confirmation
- Filter and sort tasks by status and priority
- Visual indicators for priority and status

### Authentication
- Secure registration with password confirmation
- Password hashing using bcryptjs
- JWT token-based authentication
- Automatic token storage in localStorage
- Protected routes that redirect unauthenticated users

### UI/UX
- Responsive design that works on all screen sizes
- Color-coded priority levels
- Status badges for quick identification
- Sticky task form on desktop view
- Loading states and error handling
- Toast notifications for user feedback

## Notes

- This application is configured for local development without deployment
- The MongoDB connection uses the provided credentials
- JWT tokens expire after 7 days
- All user data is associated with their account via userId
- Tasks are displayed in reverse chronological order (newest first)

## Troubleshooting

### Backend Connection Issues
- Ensure MongoDB Atlas credentials are correct
- Check that your IP is whitelisted in MongoDB Atlas
- Verify the .env file has the correct MONGO_URI

### Frontend API Not Found
- Make sure the backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env
- Clear browser cache and restart the dev server

### Port Already in Use
- Backend: Change PORT in backend/.env and update frontend/.env
- Frontend: Use `PORT=3001 npm start` to use a different port

## Development Notes

- Backend uses Express middleware for CORS to allow frontend communication
- API uses Bearer token authentication scheme
- Frontend stores token in localStorage for persistence
- Input validation happens on both frontend and backend
- All passwords are hashed before storage in database
