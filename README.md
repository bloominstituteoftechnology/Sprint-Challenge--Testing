# NES Game API Documentation

This is an api for interfacing with a list of popular games, usually on the NES console!! While this API was initially designed for NES feel free to include your favorite games from other consoles as well!!

# API Endpoints

These are the endpoints availabe for interfacing with the API, as well as required data for your CRUD requests!

|METHOD               |URL                 |DATA               |
|GET                  |/api/game/get       |                   |
|POST                 |/api/game/create    |title, genre       |
|PUT                  |/api/game/update    |id*, title         |
|DELETE               |/api/game/destroy:id|id*                |

"* - Fields denoted by an asterisk indicate that a piece of data must be entered as a parameter to the URL. ex - game with object ID '7' would be deleted by sending a delete request to localhost:port#/api/game/destroy/7"
