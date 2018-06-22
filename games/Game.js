const mongoose = require('mongoose');
const { Schema } = mongoose;

const NESGameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseDate: String,
});

NESGameSchema.methods.getGameTitle = function() {
  return this.title;
};

const Game = mongoose.model('Game', NESGameSchema);

module.exports = Game;
