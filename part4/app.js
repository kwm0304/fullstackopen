const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('dotenv').config()
const url = process.env.MONGODB_URI
// const mongoUrl = `mongodb://localhost:${PORT}/bloglist/api/blogs`
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then (() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

  app.use(express.static('build'))
  app.use(express.json())
  app.use(middleware.requestLogger)
  app.use('/api/blogs', blogRouter)
  
  app.use(middleware.uknownEndpoint)
  app.use(middleware.errorHandler)

  module.exports = app