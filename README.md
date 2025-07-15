# Simple Marketplace API

## 🚀 First Execution / Getting Started

To quickly start the Simple Marketplace API, run this command from your project root:

```bash
docker-compose --profile dev up 
```
After it’s running, access the API at: http://localhost:3000/market-place/api/v1

## ✅ Task Overview

This project implements a **Simple Marketplace API** as a take-home assignment. The goal is to build a backend API for a basic product marketplace platform using **NestJS**, **TypeORM**, and **PostgreSQL**.

The following core requirements from the task have been completed:

---

### 🔐 Authentication & Authorization

- Users can **register** and **login** using JWT-based authentication.
- Two roles are supported: `Buyer` and `Seller`.
- Access to routes is restricted based on roles:
  - Only **sellers** can add products.
  - Only **buyers** can place orders.

---

### 🛒 Product Management (Limited CRUD)

- **Sellers** can:
  - Create new products.
  - View their own listed products.
- **Buyers** can:
  - Browse all products with pagination and filtering.

> **Note:** Product update and delete operations are intentionally not implemented, as per the task scope.

---

### 📦 Order Placement

- **Buyers** can place orders for products.
- Stock is **reduced atomically** during order creation to avoid race conditions.
- Each order records the **buyer**, **product**, and **total price**.

---

### 📄 Pagination & Filtering

- Product listing supports:
  - **Pagination** using `page` and `limit` query parameters.
  - **Filtering** using:
    - `minPrice` and `maxPrice` (price range)
    - `sellerId` (optional)

---

### 🛡️ Rate Limiting

- A **rate limiter** is applied globally:
  - Limits to `100 requests per hour per IP`.

---

### 🧾 Request Logging

- All incoming HTTP requests are logged with:
  - Method
  - URL
  - Timestamp
  - Status code


