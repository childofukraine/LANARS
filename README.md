# LANARS
#
#### https://lanars.onrender.com
### [POST] /sign-up - using for register new users
### body: JSON
```json
{
	"login": "test", // allowed: letters and underscore
	"password": "test", // allowed: letters and numbers
}
```
#
### [POST] /login
#### body: JSON
```json
{
	"login": "test", // allowed: letters and underscore
	"password": "test", // allowed: letters and numbers
}
```
#### After login you will gain access token in response.body and refresh token in cookies. You should store access token in client side app in headers["authorization"].
#
### [POST] /logout
#### body: none
#### You will delete login session
#
### [POST] /create-portfolio
#### body: JSON
```json
{
    "name": "test", // required field
    "description": "test" // required field
}
```
#### headers: ["authorization"]: access_token
#### You will create new portfolio with data from body
#
### [POST] /upload-photos
#### body: multipart-form
```json
{
  "portfolioName": "test", // required
  "name": "test", // required
  "description": "test", // required 
  "comment": "test", // required
  "files": "file1.jpg", // required at least 1 file
  "files": "file2.png", // required at least 1 file
}
```
#### headers: ["authorization"]: access_token
####  Allow you to upload files to S3 from client side of application
#
### [GET] /feed 
#### body: none
#### Show you photos feed ordered by creation time
#
### [DELETE] /photo
#### body: JSON
```json
{
    "photoUrl": "test" // required
}

```
#### headers: ["authorization"]: access_token
#### Delete photo from portfolio
#
### [DELETE] /portfolio
#### body: JSON
```json
{
    "portfolioId": "test" // required
}
```
#### headers: ["authorization"]: access_token
#### Delete portfolio, and all photos inside
#
### [DELETE] /user
#### body: none
#### headers: ["authorization"]: access_token
#### Delete user account,all user portfolios and photos inside portfolios
