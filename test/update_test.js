const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === "tomcat");
      done();
    });
  }

  it("instance type using set n save", done => {
    joe.set("name", "tomcat"); // this operation is only done in memory
    assertName(joe.save(), done); // this saves the changes to the db
  });

  it("A model instance can update", done => {
    assertName(joe.update({ name: "tomcat" }), done);
  });

  it("A model class can update", done => {
    assertName(User.update({ name: "Joe" }, { name: "tomcat" }), done);
  });

  it("A model class can update one record", done => {
    assertName(
      User.findOneAndUpdate({ name: "Joe" }, { name: "tomcat" }),
      done
    );
  });

  it("A model class can find a record with an Id and update", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "tomcat" }), done);
  });

  it("A user can have their postcount incremented by 1", done => {
    User.update({ name: "Joe" }, { $inc: { likes: 13 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.likes === 13);
        done();
      });
  });
});
