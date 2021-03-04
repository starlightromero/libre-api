# Libre API

Libre API is a [REST](https://en.wikipedia.org/wiki/Representational_State_Transfer) API designed to help you find a free software alternative to the software you use everyday.

## Getting Started

Base URL `http://libresoftwarefinder.tk`

Some endpoints may require sign in.

## Authentication

### Sign Up

To sign up with Libre Software Finder

**Request**

method: `POST`

url: `/sign-up`

body:

```json
{
  "username": "username",
  "password": "password"
}
```

**Response**

body:

```json
{
  "message": "Sign up successful!",
  "user": {
    "username": "username",
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI2MDNkNjc4Y2M4NDM5NjAwMTRiNWIxNzgiLCJpYXQiOjE2MTQ2NTcyMjUsImV4cCI6MTYxNDY2MDgyNX0.clQhtrzV-xwOmK9ZyuKyYLuyd1IipNvjHOMz-8FjJmY"
}
```

### Sign In

## Libre

### Get All Software

### Get Software by ID

### Get Software by Name

### Get Software by Category

### Get Software by License

### Add Software

### Update Software

### Delete Software

## Proprietary

### Get All Software

### Get Software by ID

### Get Software by Name

### Get Software by Category

### Add Software

### Update Software

### Delete Software

## Compare

### Find Software by Name

### Find Software by Category
