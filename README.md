## Project Description

* You're going to be writing the documentation and the tests for a CRUD API.
* The API itself is really simple. You're task is to peek at the endpoints found in the `server.js` file and write docs for each one, then write the tests for the end points.

## DOCUMENTATION GOES HERE

```
THIS NEEDS TO BE FILLED IN WITH YOUR BEAUTIFUL DOCUMENTATION. IF YOU DID THIS RIGHT DURING THE PROJECT YOU SHOULD BE ABLE TO PORT OVER YOUR WORK, AND CHANGE IT TO FIT THE NEW API.
```

# Port: `http://localhost: 5050`

## Routes
- [POST] -Add new games using their 'title', 'releaseDate' and 'genre' data.

- [GET] - Allows users to view list of all the games in the database

- [PUT] - Edit game data currently in the DB. 


## [GET] '/api/game/get'

| Endpoint      | Type| Data |
| ------------- | --- | ---- |
| /api/game/get | Get | json |
| ------------- | --- | ---- |

### Example:
```

  
    title: 'Rampage',
    releaseDate: '1776',
    genre: 'Awesome'
  


```
## [POST] '/api/game/create'
```

| Endpoint         | Type | Data |
| ---------------- | ---- | ---- |
| /api/game/create | Post | json |
| ---------------- | ---- | ---- |
```

### Example:
```

  
    title: 'Rampage',
    releaseDate: '1776',
    genre: 'Awesome'
  
```

## [PUT] '/api/game/update'
```

| Endpoint         | Type| Data |
| ---------------- | --- | ---- |
| /api/game/update | PUT | json |
| ---------------- | --- | ---- |
```
### Example:
```

  
    id: gameId,
    title: 'Rampage'
  
