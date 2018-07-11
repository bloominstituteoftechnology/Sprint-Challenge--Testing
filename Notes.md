Install dependencies: `npm i`

Start: `npm start`

In Postman:

POST at localhost:5050/api/game/create

{
    "title": "California Games",
    "date": "June 1987",
    "genre": "Sports"
}

GET at localhost:5050/api/game/get

Should return:

[
    {
        "_id": "5b463d8dd4080b2c1861fef9",
        "title": "California Games",
        "genre": "Sports",
        "__v": 0
    }
]

* There is currently NO GET entry by ID

PUT and DELETE referencing Documentaiton in README

