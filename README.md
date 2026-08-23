# 🔐 Authentication & Authorization API

A secure **Authentication & Authorization REST API** built with **Node.js, Express.js, and MongoDB**.

This project implements user registration and login using **JWT authentication**, secure password hashing with **bcrypt**, protected routes, and **role-based authorization** using Express middleware.

---

## 🚀 Features

* 📝 User Registration
* 🔑 User Login
* 🔒 Secure Password Hashing with **bcrypt**
* 🎫 JWT Authentication
* 🛡️ Protected Routes
* 👤 Role-Based Authorization
* 👑 Admin-Only Routes
* 📧 Email Validation
* 🔑 Password Validation
* 🧩 Custom Authentication Middleware
* 🧩 Role-Based Authorization Middleware
* 🗄️ MongoDB Database Integration
* ⚡ RESTful API Architecture
* 🌱 Environment Variables with `.env`
* 📡 HTTP Request & Response Handling

---

## 🛠️ Technologies

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JavaScript**
* **JSON Web Token (JWT)**
* **bcrypt**
* **REST API**
* **Postman**

---

## 🔐 Authentication Flow

The authentication system works through the following process:

```text
User
 │
 ├── Register
 │      ↓
 │   Validate Data
 │      ↓
 │   Hash Password with bcrypt
 │      ↓
 │   Save User in MongoDB
 │
 └── Login
        ↓
     Validate Email & Password
        ↓
     Generate JWT
        ↓
     Return Token
        ↓
     Access Protected Routes
```

### Registration

When a user registers:

1. The API receives the user's registration data.
2. The email and password are validated.
3. The password is hashed using **bcrypt**.
4. The user is stored in MongoDB.
5. A successful response is returned.

Example:

```json
{
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
```

---

### Login

When a user logs in:

1. The API receives the email and password.
2. The user is searched for in MongoDB.
3. The password is compared using **bcrypt**.
4. A JWT token is generated after successful authentication.
5. The token is returned to the client.

---

## 🎫 JWT Authentication

After successful login, the server generates a JWT token containing authenticated user information such as the user ID and role.

Example:

```javascript
const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET
);
```

The client can then use the token to access protected endpoints.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 👥 Role-Based Authorization

The API supports **role-based access control**.

Example roles:

```text
user
admin
```

Authentication and authorization are handled through middleware.

```text
Request
   ↓
verifyToken
   ↓
User Authentication
   ↓
checkRole
   ↓
Role Authorization
   ↓
Protected Resource
```

For example, the admin route is restricted to users with the `admin` role:

```javascript
router.get(
  "/admin",
  verifyToken,
  checkRole(["admin"]),
  (req, res) => {
    return res.json({
      message: "admin route hello"
    });
  }
);
```

---

## 📌 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login`    | Login user          |

### 🛡️ Protected Routes

| Method | Endpoint              | Authentication   | Description                 |
| ------ | --------------------- | ---------------- | --------------------------- |
| `GET`  | `/api/auth/protected` | JWT Required     | Access protected user data  |
| `GET`  | `/api/auth/me`        | JWT Required     | Get authenticated user data |
| `GET`  | `/api/auth/admin`     | JWT + Admin Role | Access admin-only resources |

---

## 📡 HTTP Methods

The current API uses multiple HTTP methods:

### `POST`

Used for operations that create or submit data:

```http
POST /api/auth/register
POST /api/auth/login
```

### `GET`

Used to retrieve authenticated or protected resources:

```http
GET /api/auth/protected
GET /api/auth/me
GET /api/auth/admin
```

> Additional methods such as `PUT`, `PATCH`, and `DELETE` can be added as the API expands.

---

## 🔒 Security

### Password Hashing

Passwords are **never stored as plain text**.

The project uses `bcrypt` to hash passwords before storing them in MongoDB.

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

---

### JWT Protection

Protected routes require a valid JWT token.

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token before allowing access to protected resources.

---

## 🧩 Middleware

The project uses middleware to separate authentication and authorization logic.

### Authentication Middleware

The `verifyToken` middleware:

* Extracts the JWT from the request.
* Verifies the token.
* Retrieves the authenticated user information.
* Allows the request to continue if the token is valid.

### Role Middleware

The `checkRole` middleware:

* Checks the authenticated user's role.
* Allows access to authorized roles.
* Rejects unauthorized users.

Example:

```javascript
router.get(
  "/admin",
  verifyToken,
  checkRole(["admin"]),
  (req, res) => {
    return res.json({
      message: "admin route hello"
    });
  }
);
```

---

## 📂 Project Structure

```text
project/
│
├── controllers/
│   └── auth.controller.js
│
├── models/
│   └── auth.model.js
│
├── routes/
│   └── auth.routes.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── role.middleware.js
│
├── config/
│   └── db.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

> The exact project structure may vary depending on the implementation.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd <PROJECT_NAME>
```

Install the dependencies:

```bash
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### ⚠️ Important

Never upload your `.env` file to GitHub.

Make sure it is included in `.gitignore`:

```gitignore
.env
node_modules/
```

---

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

Or run the server directly:

```bash
node server.js
```

The API will run on:

```text
http://localhost:5000
```

---

## 🧪 API Examples

### Register

**Request**

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
```

---

### Login

**Request**

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

After successful login, the API returns a JWT token.

---

### Protected Route

**Request**

```http
GET /api/auth/protected
Authorization: Bearer <JWT_TOKEN>
```

This endpoint can only be accessed using a valid JWT token.

---

### Get Current User

**Request**

```http
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>
```

Returns information about the currently authenticated user.

---

### Admin Route

**Request**

```http
GET /api/auth/admin
Authorization: Bearer <JWT_TOKEN>
```

This endpoint requires:

```text
Valid JWT
+
admin role
```

---

## 🧪 Testing

The API can be tested using **Postman** or any REST API client.

Recommended testing flow:

```text
1. Register User
       ↓
2. Login
       ↓
3. Receive JWT
       ↓
4. Add JWT to Authorization Header
       ↓
5. Access Protected Routes
       ↓
6. Test Role-Based Authorization
```

---

## 📚 What I Learned

Through this project, I practiced and improved my understanding of:

* Building RESTful APIs with Express.js
* Node.js backend development
* MongoDB database integration
* Mongoose models
* User registration and authentication
* Password hashing with bcrypt
* JWT-based authentication
* Authentication middleware
* Role-based authorization
* Protected API routes
* HTTP methods
* Request and response handling
* API validation
* Environment variable management
* Backend project structure
* Error handling
* Testing APIs with Postman

---

## 🎯 Project Goals

The main goal of this project was to understand how authentication and authorization systems are designed and implemented in a modern Node.js backend.

The project focuses on:

```text
Authentication
      +
Authorization
      +
Security
      +
REST API
      +
MongoDB
```

---

## 👨‍💻 Author

**Mohamed Ahmed**

**Junior Full-Stack JavaScript Developer**

### ⭐ Project

If you find this project useful, feel free to give it a ⭐ on GitHub.
