const herbalModel = require('../models/herbal.model')
const response = require('../utils/response')

const get = (req, res) => {
  let condition = req.query
  herbalModel.find(condition, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('-__v')
}

const create = (req, res) => {
  let herbal = req.body.herbal
  herbalModel.create(herbal, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data herbal berhasil disimpan')
  })
}

const update = (req, res) => {
  let condition = req.body.condition
  let update = req.body.update
  herbalModel.updateMany(condition, update, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data herbal berhasil diubah')
  })
}

const destroy = (req, res) => {
  let condition = req.body.condition
  herbalModel.deleteMany(condition, (err) => {
    if(err) return response.error(res, err)
    return response.success(res, 'data herbal berhasil dihapus')
  })
}

module.exports = {
  get,
  create,
  update,
  destroy
}