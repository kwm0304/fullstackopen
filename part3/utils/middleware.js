const logger = require('./logger')

const requestLogger = (request, resposne, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.body)
  logger.info('---')
  //next yields control to the next middleware
  next()
}

//this middleware has to be last so the 'app.crud' endpoints can be tried before it is read, would result in all of them returning 404
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint.'})
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}