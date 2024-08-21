# BlogAppAPI

BlogAppAPI is a backend API for a blog application. It provides endpoints for managing blog posts, user authentication, and other related features. This API is built using Node.js and Express, and it uses MongoDB as the database.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure and Functionality](#file-structure-and-functionality)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Features

- User authentication (registration, login)
- CRUD operations for blog posts
- JWT-based authentication
- Error handling and validation

## Installation

To get started with BlogAppAPI, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Cybersayak/BlogAppAPI.git
    cd BlogAppAPI
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

## Usage

Once the server is running, you can use tools like Postman or cURL to interact with the API. The base URL for the API is `http://localhost:3000`.

## File Structure and Functionality

### `index.js`

This is the main entry point of the application. It sets up the Express server, connects to MongoDB, and defines the routes for the API.

```javascript
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogrouter from "./routes/blog-routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogrouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(process.env.PORT))
  .then(() => console.log(`Connected to MongoDB and listening on port ${process.env.PORT}`))
  .catch((error) => console.log(error));

app.use("/", (req, res, next) => {
  res.send("Hello Backend Devs");
});
```

**Explanation**:

- **Imports**: The code imports necessary modules like `express` for the server, `mongoose` for MongoDB connection, and route handlers from `user-routes.js` and `blog-routes.js`.
- **Express App Setup**: An Express app is created and JSON middleware is added to parse JSON requests.
- **Routes**: The app uses two main routes:
  - `/api/user` for user-related operations.
  - `/api/blog` for blog-related operations.
- **MongoDB Connection**: The app connects to a MongoDB database using Mongoose. The connection string is retrieved from environment variables for security.
- **Server Start**: Once connected to MongoDB, the server starts listening on the specified port.
- **Default Route**: A default route is set up to respond with "Hello Backend Devs" for any unspecified routes.

## API Endpoints

Here are some of the main endpoints provided by the BlogAppAPI:

### Authentication

- **Register a new user**
    ```http
    POST /api/user/signup
    ```

- **Login a user**
    ```http
    POST /api/user/login
    ```

### Blog Posts

- **Get all blog posts**
    ```http
    GET /api/blog
    ```

- **Create a new blog post**
    ```http
    POST /api/blog
    ```

## Contributing

Contributions are welcome! Fork the repository and create a pull request with your changes. Follow coding standards and write tests for your code.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact Information

For any questions or suggestions, feel free to open an issue or contact the repository owner.

---

This README provides a comprehensive overview of the repository, including installation instructions, usage examples, and details about the API endpoints and file functionality. Feel free to customize it further based on the specific details and requirements of your project.
