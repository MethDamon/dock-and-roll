# Dock & Roll

## How to run locally

### Frontend

#### Env variables
Create a .env file with following values:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2luZ3VsYXItbW90aC02MS5jbGVyay5hY2NvdW50cy5kZXYk
VITE_BACKEND_URL=http://localhost:3000
```

Run:
1. `cd frontend`
2.  `npm i`
3.  `npm run dev`

### Backend
#### Env variables
Create a .env file with following values:
```
PORT=3000
DATABASE_URL=file:local.db
CLERK_PUBLISHABLE_KEY=pk_test_c2luZ3VsYXItbW90aC02MS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_KKPMcLAtDj9DnbVsVXyYOXmDaGNnUm4wX08RN1Qsjf
```

Run:
1. `cd backend`
2. `npm i`
3. `npx drizzle-kit push` (Push schema to database)
4. `npm run dev`
