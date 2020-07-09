const express = require("express");
const app = express();

app.use(express.json());
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "aa",
    id: 5,
    number: "aa",
  },
  {
    name: "as",
    id: 6,
    number: "ww",
  },
  {
    name: "a",
    id: 7,
    number: "s",
  },
  {
    name: "qq",
    id: 8,
    number: "qq",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hi</h1>");
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`Phonebook has info for ${persons.length} people.
  ${date}
    `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  let person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  }
  res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  Math.floor(Math.random() * 9999);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
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
  let nameMatch = persons.find((person) => person.name === req.body.name);
  if (nameMatch) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }
  let newPerson = {
    name: body.name,
    id: generateId(),
    number: body.number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
