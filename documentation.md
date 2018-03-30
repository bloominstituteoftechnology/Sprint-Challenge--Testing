# Users API Documentation
Here's the description of the Game API! 

## Port - Location of all endpoints to interface with our API is at `http://localhost:5050`

## [POST] `/api/game/create`
| Endpoint          | Type          | Data  |
|:-----------------:|:-------------:| -----:|
| /api/game/create  | POST | json   |

### Example:
```
{
	title:"Mario Bros.",
	genre:"canopy",
	releaseDate:"Monday 12 1998"
}
```

## [GET] `/api/game/get`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/get | GET | json    |

### Example:
```
[
  {
    _id:"5abe7b02dc27588864299016",
    title:"Mario Bros.",
    genre:"canopy",
    releaseDate:"Monday 12 1998"
  },
  {
    _id:"9ibe7b02dc223864299034",
    title:"Zelda.",
    genre:"adventure",
    releaseDate:"Wednesday 14 2000"
  }
]
```

## [PUT] `/api/game/update`
| Endpoint         | Type          | Data  |
| ---------------- |:-------------:| -----:|
| /api/game/update |  PUT | json   |

### Example:
```

{
    id:"5abe7b02dc27588864299016"
    title:"Mario Bros II.",
}

```

## [DELETE] `/api/game/destroy/:id`
| Endpoint              | Type          | Data  |
| --------------------- |:-------------:| -----:|
| /api/game/destroy/:id | DELETE | json |


### Example:
```
http://localhost/api/game/destroy/5abe7b02dc27588864299016
```


### Response Example:

```
{
    "success": "Mario Bros II. was removed from the DB"
}
```