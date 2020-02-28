const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  nopes: {
    type: String,
    required: true
  },
  nm_pes: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Siswa', PostSchema);