##Server-Testing Sprint - Games

### Port - Location of all endpoints to interface with the API is at `http://localhost:5050`

## [POST] `/api/game/create`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/create   | POST | json |

```
    {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
    };
```

## [GET] `/api/game/get`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/get    | GET | json |

### Example:
```
[
   {
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    }
]
```


## [PUT] `/api/game/update`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/update   | PUT | json |

### Example:
```
    {
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    };
 ```

 Title changes to...

 ```
    {
      title: 'Vacation Game',
      genre: 'Sports',
      date: 'June 1987'
    };
```


## [DELETE] `/api/game/destroy/:id`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/game/destroy/:id   | DELETE | json |

### Example:
```
    {
      title: 'Vacation Game',
      genre: 'Sports',
      date: 'June 1987'
    };
```
Game gets deleted

```

null

```