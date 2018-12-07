

//== Project Constants =========================================================

const PORT = process.env.PORT || 3000;
module.exports = {
    // Server Configuration
    SERVER_PORT   : PORT,
    SERVER_MESSAGE: `Games API Server open on port ${PORT}`,
    // Routes
    URL_API_GAMES: '/games',
    // Database
    FIELD_ID     : 'id'         ,
    FIELD_TITLE  : 'title'      ,
    FIELD_GENRE  : 'genre'      ,
    FIELD_RELEASE: 'releaseYear',
    // Errors
    ERROR_DATAINCOMPLETE: 'Data Incomplete; Provide Title and Genre',
    ERROR_TITLECONFLICT : 'Data Conflict; Title conflicts with previous game',
    ERROR_INTERNAL      : 'Internal Error',
    // Mime Types
    MIME_APPLICATION_JSON: 'application/json',
}
