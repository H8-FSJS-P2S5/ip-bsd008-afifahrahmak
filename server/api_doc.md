# API Documentation

## Models

### User

```md
- email : string, required, unique
- password : string, required
```

### Profile

```md
- fullName : string, required
- photoProfile : string
- address : string (between 5 and 255 characters)
- phoneNumber : string (between 10 and 15 digits)
- userId : integer
```

### Topic

```md
- topic_name : string
```

### Psychologist

```md
- name : string
- specialization : string
- hourly_rate : integer
- availability : string
- email : string
- photoImage : string
```

### Reservation

```md
- date : date, required
- time : time
- duration : integer, required (minimum 1)
- session_count : integer, required (minimum 1)
- meetingType : integer, required
- description : text, required
- userId : integer
- topicId : integer
- psychologistId : integer
```

### Payment

```md
- amount : integer
- payment_status : string
- userId : integer
- reservationId : integer
```

## Relationship

### User - Profile (One-to-One)

```md
Setiap `User` memiliki satu `Profile`.
```

### User - Reservation (One-to-Many)

```md
Setiap `User` dapat membuat banyak `Reservation`.
```

### User - Payment (One-to-Many)

```md
Setiap `User` dapat membuat banyak `Payment`.
```

### Topic - Reservation (One-to-Many)

```md
Setiap `Topic` dapat memiliki banyak `Reservation`.
```

### Psychologist - Reservation (One-to-Many)

```md
Setiap `Psychologist` dapat memiliki banyak `Reservation`.
```

### Reservation - Payment (One-to-One)

```md
Setiap `Reservation` memiliki satu `Payment`.
```

## Endpoints

### Authentication

```md
- `POST /auth/login`
```

### User

```md
- `POST /user/register`
- `GET /user/profile`
- `PUT /user/profile`
- `GET /user/topics`
```

### Topic

```md
- `GET /topics`
- `GET /topics/:id`
```

### Psychologist

```md
- `GET /psychologists`
- `GET /psychologists/:id`
- `GET /psychologists/:id/schedule`
```

### Reservation

```md
- `POST /reservations`
- `GET /reservations/user`
- `GET /reservations/psychologist`
- `GET /reservations/:id`
```

### Payment

```md
- `POST /payments`
```

## 1. POST /auth/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 2. POST /user/register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 3. GET /user/profile

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "email": "string",
  "profile": {
    "fullName": "string",
    "photoProfile": "string",
    "address": "string",
    "phoneNumber": "string"
  }
}
```

## 4. PUT /user/profile

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "fullName": "string",
  "photoProfile": "string",
  "address": "string",
  "phoneNumber": "string"
}
```

Response (200 - OK)

```json
{
  "message": "Profile has been updated"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Full Name is required"
}
OR
{
  "message": "Phone number should contain only numbers"
}
OR
{
  "message": "Phone number must be between 10 and 15 digits"
}
```

## 5. GET /user/topics

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "topic_name": "string"
  }
]
```

## 6. GET /topics

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "topic_name": "string"
  }
]
```

## 7. GET /topics/:id

Response (200 - OK)

```json
{
  "id": "integer",
  "topic_name": "string"
}
```

Response (404 - Not Found)

```json
{
  "message": "Topic not found"
}
```

## 8. GET /psychologists

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "name": "string",
    "specialization": "string",
    "hourly_rate": "integer",
    "availability": "string",
    "email": "string",
    "photoImage": "string"
  }
]
```

## 9. GET /psychologists/:id

Response (200 - OK)

``json
{
"id": "integer",
"name": "string",
"specialization": "string",
"hourly_rate": "integer",
"availability": "string",
"email": "string",
"photoImage": "string"
}

```

Response (404 - Not Found)

``json
{
  "message": "Psychologist not found"
}
```

## 10. GET /psychologists/:id/schedule

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "date": "date",
    "time": "time",
    "status": "string",
    "psychologistId": "integer"
  }
]
```

Response (404 - Not Found)

```json
{
  "message": "Psychologist not found"
}
```

## 11. POST /reservations

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "date": "date",
  "time": "time",
  "duration": "integer",
  "session_count": "integer",
  "meetingType": "integer",
  "description": "text",
  "topicId": "integer",
  "psychologistId": "integer"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "date": "date",
  "time": "time",
  "duration": "integer",
  "session_count": "integer",
  "meetingType": "integer",
  "description": "text",
  "userId": "integer",
  "topicId": "integer",
  "psychologistId": "integer"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Date and time cannot be null"
}
OR
{
  "message": "Please provide a valid date and time"
}
OR
{
  "message": "Duration cannot be null"
}
OR
{
  "message": "Duration must be at least 1"
}
OR
{
  "message": "Session count cannot be null"
}
OR
{
  "message": "Session count must be at least 1"
}
OR
{
  "message": "Session count cannot be null"
}
OR
{
  "message": "Description cannot be null"
}
OR
{
  "message": "Description cannot be empty"
}
```

## 12. GET /reservations/user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "date": "date",
    "time": "time",
    "duration": "integer",
    "session_count": "integer",
    "meetingType": "integer",
    "description": "text",
    "userId": "integer",
    "topicId": "integer",
    "psychologistId": "integer",
    "psychologist": {
      "id": "integer",
      "name": "string",
      "specialization": "string",
      "hourly_rate": "integer",
      "availability": "string",
      "email": "string",
      "photoImage": "string"
    },
    "topic": {
      "id": "integer",
      "topic_name": "string"
    }
  }
]
```

## 13. GET /reservations/psychologist

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "date": "date",
    "time": "time",
    "duration": "integer",
    "session_count": "integer",
    "meetingType": "integer",
    "description": "text",
    "userId": "integer",
    "topicId": "integer",
    "psychologistId": "integer",
    "user": {
      "id": "integer",
      "email": "string"
    },
    "topic": {
      "id": "integer",
      "topic_name": "string"
    }
  }
]
```

## 14. GET /reservations/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "date": "date",
  "time": "time",
  "duration": "integer",
  "session_count": "integer",
  "meetingType": "integer",
  "description": "text",
  "userId": "integer",
  "topicId": "integer",
  "psychologistId": "integer",
  "user": {
    "id": "integer",
    "email": "string"
  },
  "topic": {
    "id": "integer",
    "topic_name": "string"
  },
  "psychologist": {
    "id": "integer",
    "name": "string",
    "specialization": "string",
    "hourly_rate": "integer",
    "availability": "string",
    "email": "string",
    "photoImage": "string"
  }
}
```

Response (404 - Not Found)

```json
{
  "message": "Reservation not found"
}
```

## 15. POST /api/payments

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "userId": "integer",
  "reservationId": "integer"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "amount": "integer",
  "payment_status": "string",
  "userId": "integer",
  "reservationId": "integer"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Reservation not found"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
