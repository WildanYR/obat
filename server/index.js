const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
require('dotenv').config()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(express.json())

  app.use('/api', routes)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  //connect to database
  mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) throw err
  })

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
