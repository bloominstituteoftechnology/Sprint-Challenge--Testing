# API Documentation

Provides access to the collection of teams of various sports.

## Port - Location of all endpoints to interface with our API is at http://localhost:3030/api/

## [GET] `/api/bands`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/teams     | GET | json |

### Example:
```
[
  {
    name: 'Boston Celtics',
    sport: 'Basketball',
  },
  {
    name: 'Dallas Cowboys',
    sport: 'Football',
  }
]
```

## [POST] `/api/team`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/team     | POST | json |

### Example:
```
  {
    name: 'Boston Celtics',
    sport: 'Basketball',
  }
```

## PUT Route
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/team     | PUT | json |

### Example:
```
  {
    name: 'L.A Lakers',
    sport: 'Basketball',
  }
```

## DELETE Route
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/team     | DELETE | json |

### Example:
```
  {
    name: 'Boston Celtics'
  }
```