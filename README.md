Notes API – Backend Application Documentation
1. Application Overview

The Notes API is a RESTful backend service built using Node.js and Express.js that allows users to securely manage notes through authenticated API endpoints.

The application provides functionality for:
User registration
User login using JWT authentication
Creating notes
Viewing notes
Updating notes
Deleting notes

All note operations are protected routes, meaning users must authenticate using a valid JWT token before accessing them.

The project also integrates:
Swagger API documentation for interactive testing
Rate limiting to prevent API abuse
SQLite database for persistent storage
Docker containerization for consistent deployment

This project demonstrates core backend engineering practices such as authentication, middleware architecture, API documentation, and containerization.

2. Technology Stack
The application is built using the following technologies:
Backend
Node.js
Express.js
Database
SQLite
Authentication
JWT (JSON Web Token)
API Documentation
Swagger (OpenAPI)
Containerization
Docker
Security
Rate limiting

Environment variable secret management

3. NPM Dependencies Used
The project installs the following dependencies via npm.

Core Dependencies
express
sqlite3
jsonwebtoken
bcryptjs
cors
dotenv
swagger-ui-express
swagger-jsdoc
express-rate-limit
Development Dependency
nodemon

Install Dependencies
Run the following command inside the project folder:
npm install

4. Application Architecture
Below is the high-level architecture of the application.

Client / Browser
       │
       │ HTTP Requests
       ▼
Swagger UI / API Client
       │
       ▼
Express Server (Node.js)
       │
       ├── Routes Layer
       │      ├── Authentication Routes
       │      └── Notes Routes
       │
       ├── Middleware Layer
       │      ├── JWT Authentication
       │      ├── Rate Limiting
       │      └── Error Handling
       │
       ▼
Controllers
       │
       ▼
SQLite Database
Architecture Explanation

The client sends HTTP requests to the server.
Requests pass through Express routes.
Middleware validates authentication and limits requests.
Controllers process the business logic.
Data is stored and retrieved from the SQLite database.

5. Project Folder Structure
notes-api
│
├── controllers
│   ├── authController.js
│   └── noteController.js
│
├── routes
│   ├── authRoutes.js
│   └── noteRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── rateLimiter.js
│   └── errorHandler.js
│
├── docs
│   ├── authDocs.js
│   └── notesDocs.js
│
├── database
│   └── db.js
│
├── server.js
├── package.json
├── Dockerfile
├── .gitignore
├── .dockerignore
└── README.md

6. Environment Variables
Create a .env file in the project root directory.

Example:
PORT=5000
JWT_SECRET=your_secret_key
Variable Description
Variable	Description
PORT	Server port
JWT_SECRET	Secret key used for signing JWT tokens

7. Running the Application Locally
Follow these steps to run the application on your local machine.

Step 1 – Clone the Repository
git clone https://github.com/YOUR_USERNAME/notes-api.git
Step 2 – Navigate to the Project
cd notes-api
Step 3 – Install Dependencies
npm install
Step 4 – Start the Server
node server.js

The server will start at:

http://localhost:5000

8. Swagger API Documentation
Swagger provides an interactive API interface where users can test endpoints directly from the browser.
Open Swagger UI:
http://localhost:5000/api-docs

Swagger allows you to:
Test API requests
View request and response schemas
Authorize JWT tokens
Explore API documentation

9. Authentication Workflow
Step 1 – Register a User
Endpoint

POST /api/auth/register

Example Request

{
 "username": "johndoe",
 "password": "password123"
}

Example Response

{
 "message": "User registered successfully"
}

Step 2 – Login
Endpoint

POST /api/auth/login

Example Request

{
 "username": "johndoe",
 "password": "password123"
}

Example Response

{
 "token": "JWT_TOKEN"
}

Step 3 – Authorize in Swagger
Click Authorize in Swagger and paste the token in this format:

Bearer JWT_TOKEN

This allows access to protected endpoints.

10. Notes API Endpoints
Create Note
POST /api/notes

Example Request

{
 "title": "First Note",
 "content": "This is my first note"
}
Get All Notes
GET /api/notes

Example Response

[
 {
  "id": 1,
  "title": "First Note",
  "content": "This is my first note"
 }
]
Update Note
PUT /api/notes/{id}

Example Request

{
 "title": "Updated Note",
 "content": "Updated content"
}
Delete Note
DELETE /api/notes/{id}

11. Docker Setup

Docker allows the application to run inside a containerized environment.

Build Docker Image
docker build -t notes-api .
Run Docker Container
docker run -d -p 5000:5000 --env-file .env --name notes-container notes-api
Check Running Containers
docker ps
View Container Logs
docker logs notes-container
Stop Container
docker stop notes-container
Remove Container
docker rm notes-container

12. Security Features
The application includes several security features:
JWT Authentication
Protects endpoints and verifies user identity.
Protected Routes
Notes endpoints require authentication.
Rate Limiting
Prevents API abuse and excessive requests.
Environment Variables
Sensitive data such as JWT secrets are stored securely using .env.

13. Conclusion
The Notes API project demonstrates a full backend development workflow including:
REST API design
JWT authentication
Middleware architecture
Database integration
API documentation using Swagger
Containerization with Docker

This project serves as a practical backend portfolio project and showcases essential backend development skills required for modern web applications.
