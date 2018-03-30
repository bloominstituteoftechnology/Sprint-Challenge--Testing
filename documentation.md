# API Documentation 
 ## API must have routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.
 ## Port - Location of all endpoints to interface with our API is at http://localhost:5050

### [POST] /api/game/create 
  
   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/create | POST | json |

```
    {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
    }
```

### [GET] /api/game/get

   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/get| GET | json |

#### * Our get method should return the list of games.
#### * REMINDER That this data structure returned from Mongo will be an array, so to test your game with a beforeEach hook you'll need to make sure you test against the first item in the array.

``` 
  [
    {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
    },
    {
        title: 'Manhattan Games',
        genre: 'Baseball',
        date: 'December 1983'
    }
  ]
```

### [PUT] /api/game/update/123, where `123` is the id of the band that you want to modify.
#### * For this end point to work you need to have id added to URL and atleast one field to update on the Band object.
   
   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/update | PUT | json |

#### * Example:
```
    {
        title: 'Manhattan Games',
        genre: 'Sports',
        date: 'December 1983'
    }
```

### [DELETE] /api/game/destroy/:id, where `:id` is the id of the band that you want to remove.
#### * For this end point to work you need to have id in the request URL.

#### * If your delete worked, you'll get a success object back.
   

   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/destroy/:id | DELETE | json |

#### Example:
```
output: 
    {
        "Band removed": {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
    }
    }