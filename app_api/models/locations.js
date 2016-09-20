var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    peopleGoing: {
      type: Number,
      default: 0
    }
});

mongoose.model('Location', locationSchema);