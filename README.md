
# Task Manager Backend

The backend for the Task Manager application, built using NestJS and Supabase. This backend is responsible for managing tasks, user authentication, and interacting with the Supabase database. It handles task creation, updating, deletion, and user authentication features.

## Features

- **User Authentication**: JWT-based authentication for user login and registration.
- **Task Management**: Create, update, delete, and assign tasks to users.
- **Task Priority & Status**: Set priorities (Low, Medium, High) and track task status (To Do, In Progress, Done).
- **Database Integration**: Uses Supabase as a backend service for user authentication and storage.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, scalable applications.
- **Supabase**: Open-source Firebase alternative for authentication, storage, and real-time database.
- **PostgreSQL**: A relational database used by Supabase for storing data.
- **JWT**: JSON Web Tokens for secure user authentication.

## Installation

### Prerequisites

- Node.js (>= 14.0.0)
- npm (>= 6.0.0)
- PostgreSQL (optional, if you want to run Supabase locally)

### Steps to Set Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/rajat457/task-manager-backend.git
   cd task-manager-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Supabase:

   - Create a Supabase account and create a project in the Supabase dashboard.
   - Set up the **users** and **tasks** tables as described below.
   - Get your **Supabase URL** and **API Key** from the Supabase dashboard.

4. Configure your `.env` file:

   Create a `.env` file at the root of the project and include the following environment variables:

   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_KEY=your-supabase-service-key
   JWT_SECRET=your-jwt-secret
   ```

5. Run the development server:

   ```bash
   npm run start:dev
   ```

   The backend will be available at `http://localhost:3000`.

## Database Schema

You will need to set up the following tables in Supabase:

### Users Table (Supabase Auth for Authentication)

Supabase automatically handles user authentication with their Auth API, but here’s a sample schema for the users table that tracks user creation time.

```sql
create table users (
  id uuid primary key,  -- Supabase auth will provide the user id
  email text unique not null, -- Email will be unique from Supabase Auth
  created_at timestamp default now() -- Created timestamp, if needed
);
```

### Tasks Table

```sql
create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  due_date date,
  priority text check(priority in ('Low', 'Medium', 'High')) default 'Medium',
  status text check(status in ('To Do', 'In Progress', 'Done')) default 'To Do',
  assigned_to uuid references users(id),
  created_at timestamp default now()
);
```

## API Endpoints

### Authentication

- **POST /auth/login**: User login, returns JWT token.
  - Request Body: `{ email: string, password: string }`
  - Response: `{ token: string }`

- **POST /auth/register**: User registration.
  - Request Body: `{ email: string, password: string }`
  - Response: `{ message: "Registration successful" }`

### Tasks

- **GET /tasks**: Get all tasks for the authenticated user.
  - Response: `[{ taskId: string, title: string, description: string, status: string, priority: string }]`

- **POST /tasks**: Create a new task.
  - Request Body: `{ title: string, description: string, due_date: string, priority: string, assigned_to: string }`
  - Response: `{ message: "Task created successfully" }`

- **PUT /tasks/:id**: Update an existing task.
  - Request Body: `{ title: string, description: string, due_date: string, priority: string, status: string }`
  - Response: `{ message: "Task updated successfully" }`

- **DELETE /tasks/:id**: Delete a task.
  - Response: `{ message: "Task deleted successfully" }`

## JWT Authentication

JWTs are used for authenticating requests to the API. Once you register or log in, a token will be issued that you must send in the `Authorization` header for all protected routes.

Example of how to pass the JWT token:

```bash
Authorization: Bearer your-jwt-token
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
