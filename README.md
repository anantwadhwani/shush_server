# About

# 🌐 Shush - Social Media App – Backend Server

## 🎯 Objective

This backend server powers a **Social Media Application - Shush**, built using **Node.js**, **Express**, and **MongoDB**. It handles everything from user authentication to post creation and user-specific content delivery. Designed with scalability and security in mind, the server includes robust APIs for interacting with the database and managing user data.

## 🛠️ Tech Stack

* **Backend Framework**: Node.js + Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JSON Web Tokens (JWT), bcrypt hashing
* **API Architecture**: RESTful APIs
* **Security**: Middleware protection, input validation, secure password handling

## 🔐 Features

### ✅ Authentication & Security

* **User Registration & Login**

  * Secure password hashing using **bcrypt**
  * JWT-based authentication for secure, stateless sessions
  * Middleware for **protecting private routes**

* **Role-Based Views**

  * Different views/responses based on user roles (e.g., admin vs regular users)

### 🔁 CRUD Operations

* **Users**

  * Create, Read, Update, Delete user profiles

* **Posts**

  * Create, Read, Update, Delete posts
  * Like/comment endpoints

* **Multiple Users Support**

  * API supports interaction between multiple users
  * Fetch posts by user, filter by category or tags

## 📡 API Endpoints Overview

> All API endpoints are prefixed with `/api`

### 👤 Auth Routes

* `POST /api/register` – Register a new user
* `POST /api/login` – Authenticate and return a JWT
* `GET /api/user` – Get user profile (protected)

### 📝 Post Routes

* `GET /api/posts` – Get all posts (paginated or filtered)
* `POST /api/posts` – Create a new post (protected)
* `PUT /api/posts/:id` – Update a post (owner only)
* `DELETE /api/posts/:id` – Delete a post (owner only)

### 👥 User Routes

* `GET /api/users/:id` – Get a specific user's public profile
* `PUT /api/users/:id` – Update user profile
* `DELETE /api/users/:id` – Delete user account

---

## 📁 Project Structure (Simplified)

```
/server
│
├── /controllers      # Logic for routes
├── /models           # Mongoose schemas
├── /routes           # API route definitions
├── /middleware       # Auth middleware (JWT)
├── /config           # DB config & environment variables
├── server.js         # Entry point
```

---

## 🔒 Security Practices

* Passwords are **never stored in plain text**
* All **protected routes require valid JWTs**
* Sensitive actions (like deleting posts/users) require **ownership checks**

## 🚀 Getting Started

1. Clone the repo
2. Run `npm install`
3. Set up `.env` with your MongoDB URI and JWT secret
4. Start server with `npm start` or `nodemon`
