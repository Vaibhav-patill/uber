# User Registration  Documentation

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

# User Login Documentation

## POST `/user/login`

### Description
Authenticates an existing user using email and password. If credentials are valid, returns a JWT token and user data. The token is also set as a cookie for session management.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

### Responses

#### Success

- **Status Code:** `200 OK`
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
- **Cookies:**  
  - `token`: JWT token is set as a cookie.

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
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

### Example Request

```bash
curl -X POST http://localhost:4000/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```

---

### Notes

- Both fields are required.
- On success, a JWT token is returned and set as a cookie for authentication in future requests.

# User Profile Endpoint Documentation

## GET `/user/profile`

### Description
Retrieves the profile information of the currently authenticated user. Requires a valid JWT token for authentication.

---

### Authentication

- **Required:** Yes  
- **How:**  
  - Send the JWT token in the `Authorization` header as `Bearer <token>`, or  
  - As a `token` cookie.

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "__v": 0
    }
    ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "No token provided, authorization denied"
    }
    ```
    or
    ```json
    {
      "message": "Token is blacklisted, authorization denied"
    }
    ```
    or
    ```json
    {
      "message": "Token is not valid"
    }
    ```

---

### Example Request

```bash
curl -X GET http://localhost:4000/user/profile \
-H "Authorization: Bearer <jwt_token>"
```

---

### Notes

- You must be logged in to access this endpoint.
- Returns the user object associated with the provided token.

---

# User Logout  Documentation

## GET `/user/logout`

### Description
Logs out the currently authenticated user by blacklisting their JWT token and clearing the authentication cookie.

---

### Authentication

- **Required:** Yes  
- **How:**  
  - Send the JWT token in the `Authorization` header as `Bearer <token>`, or  
  - As a `token` cookie.

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "No token provided, authorization denied"
    }
    ```
    or
    ```json
    {
      "message": "Token is blacklisted, authorization denied"
    }
    ```
    or
    ```json
    {
      "message": "Token is not valid"
    }
    ```

---

### Example Request

```bash
curl -X GET http://localhost:4000/user/logout \
-H "Authorization: Bearer <jwt_token>"
```

---

### Notes

- You must be logged in to access this endpoint.
- After logout, the token is blacklisted and cannot be used again.
- The authentication cookie is cleared on

# Captain Registration  Documentation

## POST `/captain/register`

### Description
Registers a new captain (driver) in the system. This endpoint validates the input, hashes the password, creates a new captain with vehicle details, and returns the created captain data.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Must be at least 1.
- `vehicle.vehicleType` (string, required): Must be one of `"car"`, `"motorcycle"`, or `"auto"`.

---

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "__v": 0
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
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
        },
        {
          "msg": "Color must be at least 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Plate must be at least 3 characters long",
          "param": "vehicle.plate",
          "location": "body"
        },
        {
          "msg": "Capacity must be at least 1",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": "Vehicle type must be car, motorcycle, or auto",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

---

### Example Request

```bash
curl -X POST http://localhost:4000/captain/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

---

### Notes

- All fields are required except `fullname.lastname`.
- `vehicleType` must be one of `"car"`, `"motorcycle"`, or `"auto"`.
- On success, the created captain object is returned.