const penyakitModel = require('../models/penyakit.model')
const response = require('../utils/response')
const databaru = require('../utils/databaseUpdate')

const get = (req, res) => {
  let condition = req.query
  penyakitModel.find(condition, (err, data) => {
    if(err) return response.error(res, err)
    return response.success(res, data)
  }).select('-__v')
}

const create = (req, res) => {
  let penyakit = req.body.penyakit
  penyakitModel.create(penyakit, (err) => {
    if(err) return response.error(res, err)
    databaru.update('penyakit', (err) => {
      if(err) return response.error(res, err)
    })
    return response.success(res, 'data penyakit berhasil disimpan')
  })
}

const update = (req, res) => {
  let condition = req.body.condition
  let update = req.body.update
  penyakitModel.updateMany(condition, update, (err) => {
    if(err) return response.error(res, err)
    databaru.update('penyakit', (err) => {
      if(err) return response.error(res, err)
    })
    return response.success(res, 'data penyakit berhasil diubah')
  })
}

const destroy = (req, res) => {
  let condition = req.body.condition
  penyakitModel.deleteMany(condition, (err) => {
    if(err) return response.error(res, err)
    databaru.update('penyakit', (err) => {
      if(err) return response.error(res, err)
    })
    return response.success(res, 'data penyakit berhasil dihapus')
  })
}

module.exports = {
  get,
  create,
  update,
  destroy
}