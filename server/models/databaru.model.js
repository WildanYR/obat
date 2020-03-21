const mongoose = require('mongoose')

const databaruSchema = mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Databaru', databaruSchema, 'databaru')