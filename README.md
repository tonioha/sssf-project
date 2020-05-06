# sssf-project
Project repository for Server-side Scripting Frameworks course

## Project description
Simple website where one can see results from League of Legends, Dota2, CS:GO or Overwatch matches.
Data comes from https://api.pandascore.co
When data is fetched, it is then saved to database and the results are shown in the front-end by using GraphQL queries.

## Installing
Clone repository https://github.com/tonioha/sssf-project.git

Install dependencies
```npm install```

Make sure you have an environment file (.env)<br/>Example of .env file
```
DB_URL=mongodb://testUser:password@localhost/results
JWT_TOKEN=your_token_here
API_TOKEN=your_api_token_here
```
DB_URL is the url for your mongo database. Make sure the user has readWrite permissions for the database.<br/>
JWT_TOKEN is used when signing the JWT token.<br/>
API_TOKEN is the key used by https://api.pandascore.co (you need to register to their platform to get an API key)

Before running the server.js, make sure to change queryUrl in public/js/queryhelper.js to http://localhost:3000/ (given that you are running the app in localhost)

Starting the app
```node server.js```
in terminal

Now head to http://localhost:3000/ and hope that the spaghetti works.
