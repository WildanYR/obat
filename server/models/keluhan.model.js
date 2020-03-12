const mongoose = require('mongoose')

const KeluhanSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Keluhan', KeluhanSchema, 'keluhan')