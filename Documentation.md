# API Documentation

## [POST] `/api/game/create`
Description: Creates a new person with a first name and a last name.

__Request Body Parameters__:

|  Field  | Type | Description
|---------|------|---------------------------------|
|title|String|Title of the game to save.|
|genre |String|Genre or type of game. |
|date |String|date the event occured. |

__Request example__:
```
{
  title: 'California Games',
  genre:  'sports',
  date:   'June 1987'
}
```



__Error 400 Response__:

|  Field  | Type | Description
|---------|-------|---------------------------------------------|
message  |String | A message describing an input error.        |



## [GET] `/api/game/get`
Description: Fetches games that exist in the database.

__Request Body Parameters__: N/A

__Success 200 Response__:

|  Field  | Type | Description
|---------|-------------|---------------------------------------------|
games   |Array<Game>|An array of all games that were found.      |


## [PUT] `/api/game/update`
Description: Updates a game by ID and title.

__Request Body Parameters__:

|  Field  | Type | Description
|---------|------|-----------------------------------|
|id|String|Id of the game to update.|
|title |String|title of the game to update. |

__Request example__:
```
{
  id: 'data[0].id',
  title:  'California Games'
}
```


__Success 200 Response__:

|  Field  | Type  | Description
|---------|-------|----------------------------------------         
game   |Game |The updated game.                     |

__Response example__:
```
{ 
  game: {
    title: 'Hawaii Games'
  }
}
```

