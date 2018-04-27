# Games API

This API is for interfacing with ASTRO's favorite games. This is an open sourced project. For contributing please reference [this contribution guide](www.github.com/astro11).

* A special note on how to work with this API here.

## API Endpoints

* The following is a list of all of the endpoints that you have available for use with our API.

### [GET] `/api/game/get`

| TYPE          | URL                   | DATA                                  |
| ------------- | --------------------- | -----------------------------------|
| GET           | /api/game/get         | gameId*, gameTitle*, gameGenre*    |
| PUT           | /api/game/update      | gameId                             |
| POST          | /api/game/create      | gameTitle*, gameGenre*             |
| DELETE        | /api/game/destroy/:id | gameId*                            |


* all fields marked with `*` are required
