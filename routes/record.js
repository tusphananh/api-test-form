const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you create a new record.
recordRoutes.route("/records").post(function (req, response) {
  let db_connect = dbo.getDb();
  const data = JSON.parse(req.body.body);
  console.log(process.env.ATLAS_URI);
  let myobj = {
    info: data.info,
    section_1: data.section_1,
    section_2: data.section_2,
  };
  db_connect.collection("test-form").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

recordRoutes.route("/records").get(function (req, response) {
  const data = { success: true, message: "Hello World" };
  response.json(data);
});

module.exports = recordRoutes;
