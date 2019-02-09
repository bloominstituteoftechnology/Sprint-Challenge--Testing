let games = []

module.exports = {
    add: (game) => {
        return games.push(game);
    },

    clear: () => {
        games = []
    },

    list: () => {
        return games;
    }
}