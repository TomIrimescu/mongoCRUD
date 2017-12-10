const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // ES6 Promise library

before(done => {
  mongoose.connect("mongodb://localhost/users_test", {
    useMongoClient: true
  });

  mongoose.connection
    .once("open", () => {
      done();
    }) // event handler for "open" event
    .on("error", error => {
      console.warn("Warning", error); // event handler for "error" event
    });
});

beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
