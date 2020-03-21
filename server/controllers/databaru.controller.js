const Databaru = require('../models/databaru.model')
const response = require('../utils/response')

const get = (req, res) => {
  let model = req.body
  Databaru.findOne(model, (err, data) => {
    if(err) return response.error(res, err)
    if(data == null) data = { model: model.model, hash: '0' }
    return response.success(res, data)
  }).select('-__v')
}

module.exports = {get}