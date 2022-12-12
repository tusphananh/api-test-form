require("dotenv").config();
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
const collectionName = "test-form";
const databaseName = "Test";
var database;
const CONNECTION_URL = process.env.ATLAS_URI;
const port = process.env.PORT || 3001;

app.listen(port, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(databaseName);
      collection = database.collection(collectionName);
      console.log("Connected to `" + databaseName + "`!");
    }
  );
});

app.get("/", (req, res, next) => {
  return res.json({ message: "Server Running" });
});

app.post("/records", async (request, response) => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      const data = JSON.parse(request.body.body);
      console.log(process.env.ATLAS_URI);
      let myobj = {
        info: data.info,
        section_1: data.section_1,
        section_2: data.section_2,
      };
      client
        .db(databaseName)
        .collection(collectionName)
        .insertOne(myobj, function (err, res) {
          if (err) throw err;
          response.json(res);
        });
    }
  );

  app.get("/records", async (request, response) => {
    const data = { success: true, message: "Hello World" };
    response.json(data);
  });
});

module.exports = app;
