const mongoose = require('mongoose')

const HerbalSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Herbal', HerbalSchema, 'herbal')