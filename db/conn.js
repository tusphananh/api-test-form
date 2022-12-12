const { MongoClient, ServerApiVersion } = require("mongodb");
const Db =
  "mongodb+srv://admin:8Uw2TKDu5m5U5B5J@cluster0.psyv5xt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("Test");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
