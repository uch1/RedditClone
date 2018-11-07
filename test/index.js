const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("site", () => {
  // Describe what you are testing
  it("Should have home page", done => {
    // Describe what should happen
    // In this case we test that the home page loads
    chai
      .request("localhost:3000")
      .get("/")
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done(); // Call done if the test completed successfully.
      });
  });
});
