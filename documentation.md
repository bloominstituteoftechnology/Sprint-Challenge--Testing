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
    title:"Mario Bros.",
    genre:"canopy",
    releaseDate:"Monday 12 1998"
  },
  {
    title:"Zelda.",
    genre:"adventure",
    releaseDate:"Wednesday 14 2000"
  }
]
```