const express = require('express')
var morgan = require("morgan")
const app = express()
const cors = require('cors')
//3.1 Implement a node app that returns a harcoded list of phonebook entries from the address http://localhost:3001/api/persons
//by sending all the info in the req.body in json format which is parsed through the next line
//This is considered middleware because it can be used for handling req and res objects
app.use(express.json())

const requestLogger = (request, resposne, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log('---')
    //next yields control to the next middleware
    next()
}

app.use(cors())
app.use(requestLogger)
app.use(morgan("tiny"));
app.use(express.static('build'))

morgan.token("body", function(req, res)  { JSON.stringify(req.body) });
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const genRandom = () => {
    const random = Math.floor(Math.random() * 100);
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
    // const resArray = res._header.split("\n")
    // const newStr = resArray[5].replace('Date:', '')
    })

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (!person) {
        response.status(404).send('No one associated with this id in the phonebook.')
    } else {
        const display = `<div><b>Name:</b> ${person.name}, <b>Number:</b> ${person.number}</div>`
        response.send(display)
    }
})
//DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


//POST
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        //if return isn't called the malfunctioning note will be saved
        return response.status(400).json({
            error: 'Name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'Number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: genRandom(),
    }
    persons = persons.concat(person)
    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint.'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})