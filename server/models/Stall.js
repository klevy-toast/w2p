const mongoose = require('mongoose');

const StallSchema = new mongoose.Schema({
  id: {
  	type: Number,
  	default: -1,
  	unique : true, required : true, dropDups: true 
  }, 
  avail: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Stalls', StallSchema);
