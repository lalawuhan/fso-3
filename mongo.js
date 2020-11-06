// mongodb+srv://fullstack:<password>@fso.muht3.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.rbbso.mongodb.net/phone-book?retryWrites=true&w=majority`;
//pw is //
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", phonebookSchema);

const person = new Person({
  name: "Low key",
  number: 1402102,
});

console.log(process.argv[3])


person.save().then((result) => {
  console.log('proces', process.argv)
  console.log(`added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
});

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
