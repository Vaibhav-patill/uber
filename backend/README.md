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
