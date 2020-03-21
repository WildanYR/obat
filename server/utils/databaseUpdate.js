const crypto = require('crypto')
const Databaru = require('../models/databaru.model')

const update = (nama, callback) => {
  let tgl = new Date()
  let dateHash = crypto.createHash('md5').update(tgl.toString()).digest('hex')
  Databaru.findOneAndUpdate({model: nama}, {
    model: nama,
    hash: dateHash
  }, { upsert: true, new: true, setDefaultsOnInsert: true }, callback)
}

module.exports = {update}