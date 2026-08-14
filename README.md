# Live Demo:
https://task-manager-front-ft6d.onrender.com/todo/completed

# React Task Manager

Task management application built with React and TypeScript.

The project allows users to register, log in, create tasks, update them, mark them as completed, delete them, and filter tasks by status and date.

A local JSON Server is used as a lightweight mock backend.

## Features

* User registration and login
* Authentication state stored in localStorage
* Create, edit, and delete tasks
* Mark tasks as completed
* View active tasks
* View completed tasks
* View today's tasks
* View overdue tasks
* User-specific task filtering
* Client-side routing
* API requests through RTK Query

## Tech Stack

* React
* TypeScript
* Redux Toolkit
* RTK Query
* React Redux
* React Router
* Ant Design
* JSON Server
* Axios
* Day.js

## Project Structure

```text
src/
├── components/     # Reusable UI components
├── hooks/          # Typed Redux hooks
├── models/         # TypeScript interfaces
├── pages/          # Application pages
├── routes/         # Route configuration
├── service/        # API services
├── store/          # Redux store and slices
├── utils/          # Shared utilities
├── db.json         # Local JSON Server database
├── App.tsx
└── index.tsx
```

## Installation

Clone the repository:

```bash
git clone https://github.com/BariBurik/react-task-manager.git
cd react-task-manager
```

Install dependencies:

```bash
npm install
```

## Running the Project

The frontend expects the local API to be available at:

```text
http://localhost:5000/
```

Start JSON Server:

```bash
npx json-server src/db.json --port 5000
```

Then open another terminal and start the frontend:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000/
```

## Production Build

Create a production build:

```bash
npm run build
```

The generated files will be placed in the `build` directory.

## Authentication

Authentication in this project is implemented for demonstration purposes.

User data is stored in JSON Server, while the current authentication state is persisted in localStorage.

This authentication approach is not intended for production use.

## About

Personal frontend project demonstrating React and TypeScript development, state management with Redux Toolkit, API integration with RTK Query, routing, form handling, and task CRUD operations.

## Preview
<img width="1867" height="951" alt="image" src="https://github.com/user-attachments/assets/427e872d-67fb-4b2d-a078-91a061480f4d" />

