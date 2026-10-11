# 🏠 NestVault

A full-stack **premium house rental platform** — **backend (Express REST API)** + **frontend (React + Vite)** are fully separated.

## Project Structure

```
Ekart_house/
├── backend/           # Express.js REST API (port 8080)
│   ├── app.js
│   ├── config/db.js
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes (/api/listings, /api/auth, etc.)
│   ├── middleware/
│   └── init/          # Seed data scripts
│
└── frontend/          # React + Vite SPA (port 5173)
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── api/        # Axios API helpers
        ├── components/ # Navbar, Footer
        └── pages/      # All page components
```

## Getting Started

### 1. Start MongoDB
Make sure MongoDB is running locally on port `27017`.

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at: **http://localhost:8080**

### 3. (Optional) Seed Sample Data
```bash
cd backend
npm run seed
```

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: **http://localhost:5173**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | Get all listings |
| GET | `/api/listings/:id` | Get single listing |
| POST | `/api/listings` | Create listing |
| PUT | `/api/listings/:id` | Update listing |
| DELETE | `/api/listings/:id` | Delete listing |
| POST | `/api/listings/:id/reviews` | Add review |
| DELETE | `/api/listings/:id/reviews/:reviewId` | Delete review |
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/logout` | Logout |
| GET | `/api/auth/current-user` | Get logged-in user |
