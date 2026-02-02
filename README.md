# Easy POS (Point of Sale)

A modern, fast, and responsive Point of Sale application built with **React 18**, **Material UI v6**, **Node.js**, and **Bun**.

## 🚀 Tech Stack

- **Runtime & Package Manager**: [Bun](https://bun.sh/) (Fast, all-in-one toolkit)
- **Frontend**: React 18, Vite, Redux Toolkit, Material UI v6, JSS
- **Backend**: Node.js, Express, TypeORM, SQLite3
- **Testing**: Bun Test (Unit), Playwright (E2E)

## ✨ Features

- **Dashboard**: Overview of sales and metrics.
- **Point of Sale**: Efficient interface for processing sales (Counter & Credit).
- **Inventory Management**: Track products, stock levels, and receiving.
- **Customer Management**: Manage customer details and credit history.
- **Reporting**: Visualize sales data and trends.

## 🛠️ Prerequisites

- **Bun**: You need to have Bun installed.
  ```bash
  # Install Bun (macOS/Linux/WSL)
  curl -fsSL https://bun.sh/install | bash
  
  # Windows (PowerShell)
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

## 📦 Installation

1. Clone the repository.
2. Install dependencies for both frontend and backend using Bun:
   ```bash
   bun install
   ```
   *Note: This command installs dependencies for the root (frontend) and automatically runs `bun install` for the `api` folder.*

## 🏃‍♂️ Development

To run the application locally:

### 1. Start the Backend API
Open a terminal and run:
```bash
bun run dev:api
```
The API server will start at `http://localhost:3500`.

### 2. Start the Frontend
Open a new terminal and run:
```bash
bun run dev:web
```
The application will be accessible at `http://localhost:3001`.

*Log in using default credentials:*
- **Username**: `admin`
- **Password**: `admin`

## Development Setup

To run the application locally, you need to start both the backend API and the frontend application in separate terminals.

1.  **Start the Backend API:**
    ```bash
    npm run dev:api
    ```
    The API will run on `http://localhost:3500`.

2.  **Start the Frontend:**
    ```bash
    npm run dev:web
    ```
    The application will open at `http://localhost:3000`.

## 🧪 Testing

We use **Bun Test** for unit testing and **Playwright** for End-to-End (E2E) testing.

### Unit Tests
Run unit tests for both backend services and frontend reducers:
```bash
bun test
```

### End-to-End (E2E) Tests
1. Ensure browsers are installed:
   ```bash
   npx playwright install
   ```
2. Run E2E tests:
   ```bash
   bun run test:e2e
   ```
   *Note: Ensure the dev servers are running or let Playwright start them automatically.*

## 📸 Screenshots

<img width="1440" alt="login" src="https://user-images.githubusercontent.com/11159061/41917847-c7aaa21e-7978-11e8-89a3-c24991753fd5.png">

<img width="1438" alt="admin page" src="https://user-images.githubusercontent.com/11159061/41917850-c7ea76a0-7978-11e8-8341-363ecbc421f3.png">

<img width="1440" alt="cart" src="https://user-images.githubusercontent.com/11159061/41918060-2fd37dde-7979-11e8-8a17-02d988f1487e.png">
