[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/0302N4UV)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856539&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

<!-- [![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12632540&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side) -->

> API Docs

<!-- [![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12632145&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini -->

# API Documentation

<!-- ## 1. POST /user/register -->

## 1. POST /register

This is where user with default role staff can create an account

#### Request - Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "newUser": {
    "id": 6,
    "username": "akustaff",
    "email": "staff@mail.com"
  }
}
```

_Response (400 - Bad Request)_

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
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "your authorization is undifined"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "you cant update/delete this data"
}
```

&nbsp;

<!-- ## 2. POST /user/login -->

## 2. POST /login

#### Request - Body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOi......"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "wrong password"
}
```

&nbsp;

<!-- ## 3. POST /advice/ -->

## 3. POST /advice

#### Request - Body

```json
{
    "title":string,
    "advice": string,
    "TypeId":string,
    "UserId": string
}
```

#### Request - Headers

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "success read advice",
  "data": [
    {
      "id": 1,
      "title": "Practice Mindfulness",
      "advice": "Take a few minutes each day to practice mindfulness meditation. Focus on your breath and be present in the moment.",
      "TypeId": 1,
      "UserId": 1,
      "createdAt": "2023-11-16T14:12:22.530Z",
      "updatedAt": "2023-11-16T14:12:22.530Z"
    }
  ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title is required"
}
OR
{
  "message": "advice is required"
}
OR
{
  "message": "TypeId is required"
}
OR
{
  "message": "UserId is required"
}


```

_Response (401 - Unauthorized)_

```json
{
  "message": "your authorization is undifined"
}
```

&nbsp;

<!-- ## 4. GET /advice/ -->

## 4. GET /advice

#### Request - Headers

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success read advice",
  "data": [
    {
      "id": 1,
      "title": "Practice Mindfulness",
      "advice": "Take a few minutes each day to practice mindfulness meditation. Focus on your breath and be present in the moment.",
      "TypeId": 1,
      "UserId": 1,
      "createdAt": "2023-11-16T14:12:22.530Z",
      "updatedAt": "2023-11-16T14:12:22.530Z"
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "your authorization is undifined"
}
```

&nbsp;

<!-- ## 5. GET /advice/:id -->

## 5. GET /advice/:id

#### Request - Headers

```json
{
  "access_token": "string"
}
```

#### Request - Params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "success read advice",
  "data": [
    {
      "id": 1,
      "title": "Practice Mindfulness",
      "advice": "Take a few minutes each day to practice mindfulness meditation. Focus on your breath and be present in the moment.",
      "TypeId": 1,
      "UserId": 1,
      "createdAt": "2023-11-16T14:12:22.530Z",
      "updatedAt": "2023-11-16T14:12:22.530Z"
    }
  ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Data Not Found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "your authorization is undifined"
}
```

&nbsp;

<!-- ## 6. PUT /advice/:id -->

## 6. PUT /advice/:id

#### Request - Body

```json
{
  "title": "string",
  "advice": "string",
  "TypeId": "integer"
}
```

#### Request - Headers

```json
{
  "access_token": "string"
}
```

#### Request - Params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "success read advice",
  "data": [
    {
      "id": 1,
      "title": "Practice Mindfulness",
      "advice": "Take a few minutes each day to practice mindfulness meditation. Focus on your breath and be present in the moment.",
      "TypeId": 1,
      "UserId": 1,
      "createdAt": "2023-11-16T14:12:22.530Z",
      "updatedAt": "2023-11-16T14:12:22.530Z"
    }
  ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title is required"
}
OR
{
  "message": "advice is required"
}
OR
{
  "message": "TypeId is required"
}
OR
{
  "message": "UserId is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "your authorization is undifined"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "you cant update/delete this data"
}
```

&nbsp;

<!-- ## 8. DELETE /advice/:id -->

## 8. DELETE /advice/:id

#### Request - Headers

```json
{
  "access_token": "string"
}
```

#### Request - Params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "sukses delete data"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Data Not Found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "your authorization is undifined"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "you cant update/delete this data"
}
```

&nbsp;

<!-- ## 9. GET /type/ -->

## 9. GET /type

#### Request - Headers

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success read TYpe",
  "data": [
    {
      "id": 1,
      "type": "experience",
      "createdAt": "2023-11-16T14:12:22.526Z",
      "updatedAt": "2023-11-16T14:12:22.526Z"
    },
    {
      "id": 2,
      "type": "psychologist",
      "createdAt": "2023-11-16T14:12:22.526Z",
      "updatedAt": "2023-11-16T14:12:22.526Z"
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "your authorization is undifined"
}
```
