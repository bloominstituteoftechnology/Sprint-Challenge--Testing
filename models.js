const mongoose = require('mongoose');
const { Schema } = mongoose;
// This is our video game schema. Notice the two methods below
// Notice the fields that are required when saving data to this model
// Notice that release date is just a string. I don't want you to have to worry about dates :)
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

NESGameSchema.statics.getGames = function(cb) {
  Game.find({}, (err, games) => {
    if (err) return cb(err);
    cb(games);
  });
};

const Game = mongoose.model('Game', NESGameSchema);

module.exports = Game;
