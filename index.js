require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require('./models/person')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));


morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);


app.get("/info", (req, res) => {
  const date = new Date();
  Person.countDocuments({},(err,amount)=>res.send(`<p>There are ${amount} people in this phonebook.</p> <p>${date}</p>`))
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
});

app.get("/api/persons/:id", (req, res, next ) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      console.log('deleted')

      res.status(204).end()
    })
    .catch(error => next(error))
})


const generateId = () => {
  Math.floor(Math.random() * 9999);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log('reqbody', req.body)
  if (!body.name) {
    return res.status(400).json({
      error: "Missing Name",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "Missing Number",
    });
  }

  const person = new Person({
    name: body.name,
    id: generateId(),
    number: body.number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    res.json(result)
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
