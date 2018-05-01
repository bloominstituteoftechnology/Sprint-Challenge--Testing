# NESGame API

This API saves Video Game information.

`*`**INPUT DATA IS EXPECTED IN THIS FORMAT**

```JSON
"title": "String",
"genre": "String",
"releaseDate": "String"
```

## Endpoints

### [POST] `/api/game/create`

### [GET] `/api/game/get`

### [PUT] `/api/game/update`

### [DELETE] `/api/game/destroy/:id`

| type   | url                   | data                        |
| ------ | --------------------- | --------------------------- |
| POST   | /api/game/create      | _title, releaseDate, genre_ |
| GET    | /api/game/get         | //                          |
| PUT    | /api/game/update      | _title, id_                 |
| DELETE | /api/game/destroy/:id | //                          |

* All fields marked with `*` are required
