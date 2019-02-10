module.exports = class Game {
  constructor () {
    this.games = []
  }

  insert (data) {
    const ind = this.games.findIndex(g => g.title === data.title)

    if (ind === -1) {
      this.games.push(data)
      return this.games
    }

    return [500, 'Title exists']
  }

  get () {
    return this.games
  }
}