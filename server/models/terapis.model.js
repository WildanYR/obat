const mongoose = require('mongoose')

const TerapisSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Terapis', TerapisSchema, 'terapis')