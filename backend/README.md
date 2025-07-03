# User Registration Endpoint Documentation

## POST `/user/register`

### Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates a new user, and returns a JWT token along with the user data.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "__v": 0
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

---

### Example Request

```bash
curl -X POST http://localhost:4000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```

---

### Notes

- All fields are required except `lastname`.
- On success, a JWT token is returned for authentication

# User Routes API Documentation

This document describes the endpoints available in `UserRoutes.js` for user authentication and profile management.

---

## POST `/register`

**Description:**  
Register a new user.

**Request Body:**
- `email` (string, required): Must be a valid email address.
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters.
- `password` (string, required): Minimum 6 characters.

**Validation:**
- Email must be valid.
- First name must be at least 3 characters.
- Password must be at least 6 characters.

**Response:**
- `201 Created` with `{ token, user }` on success.
- `400 Bad Request` with validation errors.

---

## POST `/login`

**Description:**  
Authenticate a user and return a JWT token.

**Request Body:**
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

**Validation:**
- Email must be valid.
- Password must be at least 6 characters.

**Response:**
- `200 OK` with `{ token, user }` on success.
- `401 Unauthorized` if credentials are invalid.
- `400 Bad Request` with validation errors.

---

## GET `/profile`

**Description:**  
Get the authenticated user's profile.

**Authentication:**  
Requires a valid JWT token in the `Authorization` header or `token` cookie.

**Response:**
- `200 OK` with user profile data.
- `401 Unauthorized` if token is missing, invalid, or blacklisted.

---

## GET `/logout`

**Description:**  
Logout the authenticated user by blacklisting the current JWT token.

**Authentication:**  
Requires a valid JWT token in the `Authorization` header or `token` cookie.

**Response:**
- `200 OK` with `{ message: "Logged out successfully" }`.
- `401 Unauthorized` if token is missing, invalid, or blacklisted.

---

## Error Responses

- `401 Unauthorized`: Returned if authentication fails or token is blacklisted.
- `400 Bad Request`: Returned if validation fails.

---

## Notes

- All endpoints except `/register` and `/login` require authentication.
- JWT tokens are expected in the `Authorization: Bearer <token>` header or as a `token` cookie.
- On logout, the token is blacklisted and cannot be used again.
