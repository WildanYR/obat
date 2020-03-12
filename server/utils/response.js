const success = (res, data) => {
  res.json({
    success: true,
    data: data
  })
}

const error = (res, msg) => {
  res.json({
    success: false,
    data: msg
  })
}

module.exports = {
  success,
  error
}