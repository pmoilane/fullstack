const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
morgan.token('person', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
]

app.get("/api/persons", (request, response) => {
    return response.json(persons)
})

app.get("/info", (request, response) => {
    return response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${Date().toString()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find((person => person.id === id))
    if (person) {
        return response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find((person => person.id === id))
    console.log(person)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    
    return response.json(person)
})

app.post("/api/persons/", (request, response) => {
    const body = request.body

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    if (!body.name || !body.number){
        return response.status(400).json({
            error: "request must have a name and a number"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000).toString()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})