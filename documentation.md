# API Documentation 
 ## API must have routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.
 ## Port - Location of all endpoints to interface with our API is at http://localhost:5050

### [POST] /api/game/create
  
   | Endpoint         | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/create | POST | json |

```
    {
        title: 'Jumanji',
        releaseDate: 1995
    }
```

### [GET] /api/game/get

   | Endpoint      | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/get | GET  | json |

```
output:
  [
    {
        title: 'Jumanji',
        releaseDate: 1995
    },
    {
        title: 'Monoploy',
        releaseDate: 1935
    }
  ]
```

### [PUT] /api/game/update/:123, where `123`, for example, is the `id` of the game that you want to modify.
#### * For this end point to work you need to have id added to URL and atleast one field to update on the Game object.
   
   | Endpoint            | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/update:id | PUT  | json |

#### * Example:
```
    {
        title: 'Jumanji',
        releaseDate: 2017
    }
```

### [DELETE] /api/game/destroy/:id, where `123` is the id of the game that you want to remove.
#### * For this end point to work you need to have id in the request URL.

#### * If your delete worked, you'll get a success object back.
   

   | Endpoint              | Type   | Data |
   |:---------------:|:----------:|:---------:|
   | /api/game/destroy/:id | DELETE | json |

#### Example:
```
output: 
    {
        'success': 'Jumanji was removed from the DB'
    }
```