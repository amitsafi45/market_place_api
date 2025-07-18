# Simple Marketplace API

## 🚀 First Execution / Getting Started

To quickly start the Simple Marketplace API, run this command from your project root:

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project directory
cd market-place-api

# Checkout the main branch
git checkout main

# Start the development environment
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
## 📘 API Documentation

### 🔐 Authentication Routes

---

### ➕ Register a User

**URL:** `/users/register`  
**Method:** `POST`  
**Description:** Registers a new user with `Buyer` or `Seller` role.

#### 🧾 Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123",
  "role": "Buyer" --->otional(default ->Buyer)
}
```
#### 🧾 Response
```json
{
    "success": true,
    "statusCode": 201,
    "message": "Account created Successfully"
}
```
### 🔑 Login User
**URL:** `/users/login`  
**Method:** `POST`  
**Description:** Authenticates a user and returns a JWT token.

#### 🧾 Request Body

```json
{
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```
### 🧾 Response
```json
{
    "success": true,
    "statusCode": 202,
    "message": "Login Successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMWJkZjA4Ni1iZjU1LTQwNjUtYjI1Zi05YmMzZmMyZDVkNjAiLCJyb2xlIjoiU2VsbGVyIiwiZW1haWwiOiJhbWl0MjAyMjNAZ21haWwuY29tIiwiaWF0IjoxNzUyNDMyNDg4LCJleHAiOjE3NTI0MzYwODh9.HWY--pERNtespRapqNBhMuLrLvrlsYIMJz2p_ildnJI",
        "user": {
            "id": "31bdf086-bf55-4065-b25f-9bc3fc2d5d60",
            "email": "amit20223@gmail.com",
            "role": "Seller"
        }
    }
}
```
### 📦 Product API

**URL:** `GET /products`  
**Method:** `GET`  
**Description:** Fetch a list of products.

**Query Parameters:** Supports filtering and pagination via ProductQuery (e.g., price range, seller ID, page, limit).

#### 🧾 Response 

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Product list fetched successfully",
    "data": {
        "success": true,
        "statusCode": 200,
        "message": "Products fetched successfully",
        "meta": {
            "total": 1,
            "totalPages": 1,
            "currentPage": 1,
            "nextPage": null,
            "prevPage": null,
            "limit": 1
        },
        "items": [
            {
                "id": "1e3673f2-01f6-453d-ace5-27f0f48dc42b",
                "name": "Wireless Mouse",
                "price": "1299",
                "stock": 2,
                "description": "Ergonomic wireless mouse with 1600 DPI, suitable for both office and gaming use."
            }
        ]
    }
}
```
**URL:** `POST /products`  
**Method:** `POST`  
**Description:** Allows a Seller to create a new product. 

**Authorization:** Access restricted to authenticated users with the role Seller.

**Body** Accepts product details matching below json format.

#### Request Body
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "stock": 50
}

```
#### Response 
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Product created successfully"
}
```
**URL:** `GET /products/seller-product-list`  
**Method:** `GET`  
**Description:**  Allows a Seller to retrieve the list of products they have created (i.e., their own products only). 

**Authorization:** Access is restricted to authenticated users with the role Seller.
Requires JWT token in the Authorization header.
```
#### Response 
```json
{
  "success": true,
  "statusCode": 202,
  "message": "Product Fetched successfully",
  "data": [
    {
      "id": "a1b2c3d4",
      "name": "Sample Product",
      "price": 100,
      "stock": 10,
      "sellerId": "uuid-of-seller",
      "createdAt": "2025-07-15T10:00:00.000Z"
    },
    ...
  ]
}

```

#### 🛒 Order API
**URL:** `POST /orders`  
**Method:** `POST`  
**Description:** Place an order for one or more products (only accessible to Buyers).

**Authorization:** Requires the user to be logged in with role Buyer.
Protected with Authentication and Authorization guards.

#### Request Body
```json
{
  "items":[{
    "productId":"1e3673f2-01f6-453d-ace5-27f0f48dc42b"--->product id,
    "quantity":3
    
  }]
}
```
#### Response 
```json
{
"success": true,
"statusCode":201,
"message": "Order Placed Successfully",
};
```

