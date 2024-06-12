const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
const server = require("../index");

chai.use(chaiHttp);

describe("Main", () => {
  it("Is Server Working?", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        expect(res.body.data).to.be.equal("Server is working.");
        done();
      });
  });
});
