# CRUD-API

How to start

clone the repo / git clone https://github.com/Newteeth/CRUD-API.git /

install all dependencies / npm i /
 
How to run application

* Run the application in development mode / npm run start:dev /

* Run the application in production mode / npm run start:prod /

* Run cluster mode / npm run start:multi /

Usage

Implemented endpoint api/users:

* GET api/users - to get all persons 
* GET api/users/{userId} - to get user by id 
* POST api/users - to create record about new user and store it in database 
* PUT api/users/{userId} - to update existing user 
* DELETE api/users/{userId} - to delete existing user from database

Users are stored as objects that have following required properties (type):

username — user's name: string
age — user's age: number
hobbies — user's hobbies: Array |string| or empty Array