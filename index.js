const express = require("express");
const app = express();

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

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
