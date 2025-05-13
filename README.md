# Employee Management System

A full-stack application for managing employee data with React.js frontend and Express.js backend.

## Project Structure

The project is divided into two main folders:

- `frontend`: React.js application
- `backend`: Express.js API with MongoDB

## Backend Setup

1. Navigate to the backend folder:
   \`\`\`
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a `.env` file with your MongoDB connection string:
   \`\`\`
   MONGODB_URL=your_mongodb_connection_string
   PORT=5000
   \`\`\`

4. Start the server:
   \`\`\`
   npm run dev
   \`\`\`

The server will run on http://localhost:5000

## Frontend Setup

1. Navigate to the frontend folder:
   \`\`\`
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`
   npm start
   \`\`\`

The React app will run on http://localhost:3000

## Features

- Add, view, edit, and delete employees
- Search functionality
- Pagination
- Form validation
- Responsive design

## API Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get a specific employee
- `POST /api/employees` - Add a new employee
- `PUT /api/employees/:id` - Update an employee
- `DELETE /api/employees/:id` - Delete an employee
v
