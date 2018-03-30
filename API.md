# Sprint Challenge - Testing - Games API
This API will allow users to view a list of games including the games' titles, release dates and genres. Users are also given the ability to add new game entries to the database, edit a chosen game's information and delete a game entirely.

## Port - Location of all endpoints to interface with the API is at `http://localhost:5050`


## Routes
- [POST] - Allows users to add a new game. Accepts `title`, `releaseDate` and `genre` data.
- [GET] - Allows users to view a list of all games
- [PUT] - Allows users to edit a game. Requires `title` and `id` data
- [DELETE] - Allows users to delete a game. 

## [POST] `/api/game/create`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/create     | POST | json |

### Example:
```
{
  title: 'Halo',
  releaseDate: 'November 15, 2001',
  genre: 'First Person Shooter'
}
```

## [GET] `/api/game/get`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/get     | GET | json |

### Example:
```
[
  {
    title: 'Halo',
    releaseDate: 'November 15, 2001',
    genre: 'First Person Shooter'
  },
  {
    title: 'Fortnite',
    releaseDate: 'July 25, 2017',
    genre: 'Survival'
  }
]
```
## [PUT] `/api/game/update`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/update     | PUT | json |

### Example:
```
  {
    id: gameID,
    title: 'Fortnite Battle Royale',
  }
```

## [DELETE] `/api/game/destroy/:id`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/destroy/:id     | DELETE | json |
