const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test", {
  useMongoClient: true
});

mongoose.connection
  .once("open", () => console.log("Good to go!")) // event handler for "open" event
  .on("error", error => {
    console.warn("Warning", error); // event handler for "error" event
  });
