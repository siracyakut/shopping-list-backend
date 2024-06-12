const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
const server = require("../index");

chai.use(chaiHttp);

describe("BestBuy", () => {
  it("Search for 'iPhone 15' in BestBuy Products", (done) => {
    const data = {
      query: "iPhone 15",
      page: 1,
    };

    chai
      .request(server)
      .post("/bby/product/search")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("object");
        res.body.data.products.should.be.a("array");
        done();
      });
  });

  it("Search with bad request in BestBuy Products", (done) => {
    const data = {
      query: 11,
    };

    chai
      .request(server)
      .post("/bby/product/search")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Get product with ID in BestBuy", (done) => {
    chai
      .request(server)
      .get("/bby/product/6525429")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("array");
        done();
      });
  });

  it("Get product with invalid ID in BestBuy", (done) => {
    chai
      .request(server)
      .get("/bby/product/65aaa25429")
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });
});
