const Databaru = require('../models/databaru.model')
const response = require('../utils/response')

const get = (req, res) => {
  let model = req.body
  Databaru.findOne(model, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('model hash')
}

module.exports = {get}