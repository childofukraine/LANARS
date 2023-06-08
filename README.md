# LANARS
POST /sign-up 
{
    "login": "test",
    "password": "test"
}


POST /login
{
    "login": "test",
    "password": "test"
}

POST /logout
body: none


POST /create-portfolio
{
    "name": "test",
    "description": "test"
}

POST /upload-photos
body: multipart-form
{
  "portfolioName": "test", 
  "name": "test", // required
  "description": "test", // required at least 1 file
  "comment": "test",
  "files": "file1.jpg", // required at least 1 file
  "files": "file2.png", // required at least 1 file
}

GET /feed 


DELETE /photo
{
    "photoUrl": "test"
}


DELETE /portfolio
{
    "portfolioId": "test"
}


DELTE /user
body: none

