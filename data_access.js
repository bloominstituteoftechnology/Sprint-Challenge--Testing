

//== Games Data Accessor =======================================================

//-- Dependencies --------------------------------
const config = require('./config.js');


//== Implementation ============================================================

module.exports = {
    games: [],

//-- Clear Database (truncate) -------------------
    async clear() {
        this.games = [];
    },

//-- Get all Games (as array) --------------------
    async get(id) {
        if(id) {
            // Stretch
        }
        return this.games.map((game, index) => {
            const gameWithId = {
                [config.FIELD_ID   ]: index + 1,
                [config.FIELD_TITLE]: game.title,
                [config.FIELD_GENRE]: game.genre,
            };
            if(game[config.FIELD_RELEASE]) {
                gameWithId[config.FIELD_RELEASE] = game[config.FIELD_RELEASE];
            }
            return gameWithId;
        });
    },

//-- Create and Store a new Game -----------------
    async create(gameData) {
        // Validate data
        const gameTitle   = gameData[config.FIELD_TITLE  ];
        const gameGenre   = gameData[config.FIELD_GENRE  ];
        const gameRelease = gameData[config.FIELD_RELEASE];
        if(!gameTitle || !gameGenre) {
            throw new Error(config.ERROR_DATAINCOMPLETE);
        }
        // Test if Title already exists (would be easier with a real database)
        const titleConflict = this.games.find(testGame => {
            return testGame[config.FIELD_TITLE] === gameTitle;
        });
        if(titleConflict) {
            throw new Error(config.ERROR_TITLECONFLICT);
        }
        // Insert Data
        const newGame = {
            [config.FIELD_TITLE]: gameData.title,
            [config.FIELD_GENRE]: gameData.genre,
        };
        if(gameRelease) {
            newGame[config.FIELD_RELEASE] = gameRelease;
        }
        this.games.push(newGame);
        // Return game id
        return this.games.length;
    },
};
