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

status: `200`

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

To sign in to Libre Software Finder

**Request**

method: `POST`

url: `/sign-in`

body:

```json
{
  "username": "username",
  "password": "password"
}
```

**Response**

status: `200`

body:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI2MDNkNjc4Y2M4NDM5NjAwMTRiNWIxNzgiLCJpYXQiOjE2MTQ2NTcyMjUsImV4cCI6MTYxNDY2MDgyNX0.clQhtrzV-xwOmK9ZyuKyYLuyd1IipNvjHOMz-8FjJmY"
}
```

## Libre

### Get All Software

To see all Libre software alternatives:

**Request**

method: `GET`

url: `/libre`

headers: none required

**Response**

status: `200`

body:

```json
{
  "software": [
    {
      "name": "LibreOffice",
      "category": "Word processor",
      "repo": "https://github.com/libre-office/libre-office.git",
      "website": "https://libreoffice.org",
      "description": "FOSS word processing",
      "license": "GPL-2.0"
    },
    {
      "name": "LibreWolf",
      "category": "Web browser",
      "repo": "https://github.com/libre-wolf/libre-wolf.git",
      "website": "https://librewolf.org",
      "description": "FOSS web browser",
      "license": "GPL-2.0"
    },
  ]
}
```

### Get Software by ID

To see one Libre software alternative by ID:

**Request**

method: `GET`

url: `/libre/:softwareId`

headers: none required

**Response**

status: `200`

body:

```json
{
  "software":
    {
      "name": "LibreOffice",
      "category": "Word processor",
      "repo": "https://github.com/libre-office/libre-office.git",
      "website": "https://libreoffice.org",
      "description": "FOSS word processing",
      "license": "GPL-2.0"
    }
}
```

### Get Software by Name

To see one Libre software alternative by name:

**Request**

method: `GET`

url: `/libre/name/:softwareName`

headers: none required

**Response**

status: `200`

body:

```json
{
  "software":
    {
      "name": "LibreOffice",
      "category": "Word processor",
      "repo": "https://github.com/libre-office/libre-office.git",
      "website": "https://libreoffice.org",
      "description": "FOSS word processing",
      "license": "GPL-2.0"
    }
}
```

### Get Software by Category

To see Libre software alternatives by category:

**Request**

method: `GET`

url: `/libre/category/:softwareCategory`

headers: none required

**Response**

Returns list of software alternatives by category.

status: `200`

body:

```json
{
  "software":[
    {
      "name": "LibreOffice",
      "category": "Word processor",
      "repo": "https://github.com/libre-office/libre-office.git",
      "website": "https://libreoffice.org",
      "description": "FOSS word processing",
      "license": "GPL-2.0"
    },
    {
      "name": "Calligra Words",
      "category": "Word processor",
      "repo": "https://github.com/calligra-words/calligra-words.git",
      "website": "https://libreoffice.org",
      "description": "FOSS word processing",
      "license": "GPL-2.0"
    }
  ]
}
```

### Get Software by License

To see Libre software alternatives by license:

**Request**

method: `GET`

url: `/libre/license/:softwareLicense`

headers: none required

**Response**

Returns list of software alternatives by license type.

status: `200`

body:

```json
{
  "software":[
    {
      "name": "LibreOffice",
      "category": "Word processor",
      "repo": "https://github.com/libre-office/libre-office.git",
      "website": "https://libreoffice.org",
      "description": "FOSS word processing",
      "license": "GPL-2.0"
    },
    {
      "name": "LibreWolf",
      "category": "Web browser",
      "repo": "https://github.com/librewolf/librewolf.git",
      "website": "https://libre-wolf.org",
      "description": "FOSS web browser",
      "license": "GPL-2.0"
    }
  ]
}
```

### Add Software

To add a new Libre software alternative:

**Request**

method: `POST`

url: `/libre`

```json
headers: {
  "Authorization": "Bearer <token>"
}
```

**Response**

Returns the new software.

status: `200`

body:

```json
{
  "software":
    {
      "name": "NewSoftware",
      "category": "Messaging",
      "repo": "https://github.com/new-software/new-software",
      "website": "https://newfoss.org",
      "description": "FOSS Messaging",
      "license": "GPL-3.0"
    }
}
```

### Update Software

To update a Libre software alternative:

**Request**

method: `PATCH`

url: `/libre/:softwareId`

```json
headers: {
  "Authorization": "Bearer <token>"
}
```

**Response**

Returns the updated software.

status: `200`

body:

```json
{
  "software":
    {
      "name": "UpdatedSoftware",
      "category": "Messaging",
      "repo": "https://github.com/new-software/new-software",
      "website": "https://newfoss.org",
      "description": "FOSS Messaging",
      "license": "GPL-3.0"
    }
}
```

### Delete Software

To delete a Libre software alternative:

**Request**

method: `DELETE`

url: `/libre/:softwareId`

```json
headers: {
  "Authorization": "Bearer <token>"
}
```

**Response**

Returns a deletion successful message and the ID of the deleted document.

status: `200`

body:

```json
{
  "message": "Successfully deleted.",
  "_id": "aaaaaaaaaaaa"
}
```

## Proprietary

### Get All Software

To view all proprietary softwares:

**Request**

method: `GET`

url: `/proprietary`

headers: none required

**Response**

Returns a list of all proprietary software in the Libre API database.

status: `200`

body:

```json
{
  "software": [
    {
      "name": "Google Docs",
      "category": "Word processor"
    },
    {
      "name": "Google Chrome",
      "category": "Web browser",
    },
    {
      "name": "Microsoft Word",
      "category": "Word processor"
    }
  ]
}
```

### Get Software by ID

To view a proprietary software by ID:

**Request**

method: `GET`

url: `/proprietary/:softwareId`

headers: none required

**Response**

Returns a single proprietary software by ID.

status: `200`

body:

```json
{
  "software":
    {
      "name": "Google Docs",
      "category": "Word processor"
    }
}
```

### Get Software by Name

To view a proprietary software by name:

**Request**

method: `GET`

url: `/proprietary/name/:softwareName`

headers: none required

**Response**

Returns a single proprietary software by name.

status: `200`

body:

```json
{
  "software":
    {
      "name": "Google Docs",
      "category": "Word processor"
    }
}
```

### Get Software by Category

method: `GET`

url: `/proprietary/name/:softwareName`

headers: none required

**Response**

Returns a list of proprietary softwares by category.

status: `200`

body:

```json
{
  "software": [
    {
      "name": "Google Docs",
      "category": "Word processor"
    },
    {
      "name": "Microsoft Word",
      "category": "Word processor"
    }
  ]
}
```

### Add Software

To add a new proprietary software:

**Request**

method: `POST`

url: `/proprietary`

```json
headers: {
  "Authorization": "Bearer <token>"
}
```

**Response**

Returns the new software.

status: `200`

body:

```json
{
  "software":
    {
      "name": "Google Sheets",
      "category": "Spreadsheet",
    }
}
```

### Update Software

To update a proprietary software:

**Request**

method: `PATCH`

url: `/proprietary/:softwareId`

```json
headers: {
  "Authorization": "Bearer <token>"
}
```

**Response**

Returns the updated software.

status: `200`

body:

```json
{
  "software":
    {
      "name": "Updated Software",
      "category": "Spreadsheet",
    }
}
```

### Delete Software

To delete a proprietary software:

**Request**

method: `DELETE`

url: `/proprietary/:softwareId`

```json
headers: {
  "Authorization": "Bearer <token>"
}
```

**Response**

Returns the deleted software.

status: `200`

body:

```json
{
  "message": "Successfully deleted.",
  "_id": "aaaaaaaaaaaa"
}
```

## Compare

The Libre API also allows you to compare softwares to find the best alternatives for you. You can search the name or category of proprietary softwares, and find alternatives within the same category.

### Find Software by Name

method: `GET`

url: `/name/:softwareName`

headers: none required

**Response**

Returns a list of Libre software alternatives in the same category as the proprietary software searched by name.

So, if you were to search "iMessage":

status: `200`

body:

```json
{
  "software": [
    {
      "name": "Session",
      "category": "Messaging",
      "repo": "https://github.com/session/session.git",
      "website": "https://getsession.org",
      "description": "Free and secure messaging",
      "license": "GPL-2.0"
    },
    {
      "name": "Pidgin Internet Messenger",
      "category": "Messaging",
      "website": "https://pidgin.in",
      "description": "Free secure internet messaging",
      "license": "GPL-3.0"
    }
  ]
}
```

### Get Software by Category

method: `GET`

url: `/category/:softwareCategory`

headers: none required

**Response**

Returns a list of Libre software alternatives in the same category as the proprietary software searched by category.

So, if you were to search "Word processing":

status: `200`

body:

```json
{
  "software": [
    {
      "name": "LibreOffice Writer",
      "category": "Word processing",
      "repo": "https://github.com/libre-office/libre-office.git",
      "website": "https://libre-office.org",
      "description": "Free open source word processing",
      "license": "GPL-3.0"
    },
    {
      "name": "Vim",
      "category": "Word processing",
      "description": "Free open source word processing",
      "license": "GPL-3.0"
    }
  ]
}
```
