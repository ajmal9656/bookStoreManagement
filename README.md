# BookStore Inventory Management System

A full-stack BookStore Inventory Management System built using **React**, **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize**. The application allows users to manage authors and books, update book stock, search and filter books, and view author details with paginated books.

---

# Tech Stack

## Frontend
- React (Vite)
- React Hook Form

## Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Joi Validation
- Jest
- Supertest

---

# Features

## Authors

- Create Author
- List Authors
- Search Authors
- View Author Details
- Paginated Books by Author

## Books

- Create Book
- Update Book Stock
- Search Books
- Filter by Minimum Price
- Filter by In-Stock Books
- Pagination

---

# Backend Setup

## 1. Navigate to backend

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

NODE_ENV=development
CLIENT_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore
DB_USER=postgres
DB_PASSWORD=your_password

TEST_DB_HOST=localhost
TEST_DB_PORT=5432
TEST_DB_NAME=bookstore_test
TEST_DB_USER=postgres
TEST_DB_PASSWORD=your_password
```

---

## 4. Run Database Migrations

Development Database

```bash
npx sequelize-cli db:migrate
```

Test Database

```bash
npx sequelize-cli db:migrate --env test
```

---

## 5. Start Backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

## 1. Navigate to frontend

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 4. Start Frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Running Tests

Navigate to backend

```bash
cd backend
```

Run all integration tests

```bash
npm test
```

The project includes integration tests covering:

- Author Creation
- Duplicate Author Validation
- Book Creation
- Book Validation
- Stock Update
- Negative Stock Rejection

---

# Validation

The backend validates all incoming requests using **Joi** before reaching the controllers.

Validation includes:

- Required fields
- Positive prices
- Non-negative stock
- Existing author validation
- Duplicate book title validation for the same author

---

# Author

**Muhammed Ajmal S**
