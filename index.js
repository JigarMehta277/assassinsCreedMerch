//IMPORT REQUIRED MODULES
const { request, response } = require("express");
const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

//Mongo config stuff
const dbUrl = "mongodb+srv://jigarmehta277:bHvTsOsY4gW8NIu4@cluster0.acpncnt.mongodb.net/assassinsCreedDb?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl);

//Set up Express app and port number
const app = express();
const port = process.env.PORT || 8888;

//Set up static file path
app.use(express.static(path.join(__dirname, "public")));

//Set up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


//Page routes
app.get("/", async (request, response) => {
  response.render("index", { title: "Home" });
});

app.get("/buyMerch", async (request, response) => {
  merchData = await fetchTable();
  response.render("buyMerch", { title: "Buy Merch", merch: merchData });
});

app.get("/characters", async (request, response) => {
  charactersData = await fetchCharacterTable();
  response.render("Characters", { title: "Characters", characters: charactersData });
});

app.get("/contactUs", async (request, response) => {
  response.render("contactUs", { title: "Contact us" });
});

//Set up server listening
app.listen(port, () => {
  console.log(`listening on http://localhost:${port} `);
});

//MONGO FUNCTIONS
async function connection() {
  await client.connect();
  db = client.db("assassinsCreedDb");
  return db;
}

async function fetchTable() {
  db = await connection();
  var results = db.collection("actionFigures").find({});
  res = await results.toArray();
  return res;
}

async function fetchCharacterTable() {
  db = await connection();
  var results = db.collection("characters").find({});
  res = await results.toArray();
  return res;
}