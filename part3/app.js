const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const len = process.argv.length
const password = process.argv[2] || process.env.PASSWORD
const Person = require('./models/person')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
//3.1 Implement a node app that returns a harcoded list of phonebook entries from the address http://localhost:3001/api/persons
//by sending all the info in the req.body in json format which is parsed through the next line
//This is considered middleware because it can be used for handling req and res objects
console.log(password)

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })



app.use(cors())
app.use(express.static('build'))
app.use(express.json())//If this was at the bottom of the page, everything would return undefined
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(errorHandler)

//use full quotation marks if name is going to include a space ie First Last
const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

const genRandom = () => {
  const random = Math.floor(Math.random() * 100)
  const idArray = persons.map(p => p.id)

  if (idArray.includes(random)) {
    genRandom()
  } else return
}

//GET
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  console.log(date)
  const len = persons.length
  const info = `<div>Phonebook has info for ${len} people.</div> <br />
    <div>${date}</div>`
  response.send(info)
// const resArray = res._header.split('\n')
// const newStr = resArray[5].replace('Date:', '')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
        const display = `<div><b>Name:</b> ${person.name}, <b>Number:</b> ${person.number}</div>`
        response.send(display)
      } else {
        response.status(404).end()
      }
    })
    //if next was called w/o a param then it would just continue to the 'next' error-handling middleware
    .catch(error =>  next(error))
})
    
//DELETE
//2 cases for deletion, person is in db & person isn't in db
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

//PUT
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }
  //new true enables the event handler to bwe called with the updated doc instead of original
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//POST
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    //if return isn't called the malfunctioning note will be saved
    return response.status(400).json({
      error: 'Name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'Number missing'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
    id: genRandom(),
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

if (len > 3) {
  person.save().then(result => {
    console.log(result)
    console.log(`added ${person.name} number ${person.number} to phonebook`)
  })
  Person.find({}).then(result => {
    console.log('result', result._id)
    result.forEach(person => {
      console.log(person)
    }) 
    mongoose.connection.close()
  }) 
} else if (len == 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app