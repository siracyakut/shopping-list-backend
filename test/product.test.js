const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
const server = require("../index");

chai.use(chaiHttp);

describe("Products", () => {
  let token = "";

  chai
    .request(server)
    .post("/auth/login")
    .send({
      email: "darkcik@sirac.com",
      password: "123456Sirac!",
    })
    .end((err, res) => {
      token = res.body.data.token;
    });

  it("Get list of products", (done) => {
    chai
      .request(server)
      .get("/product")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("array");
        done();
      });
  });

  it("Get product with ID", (done) => {
    chai
      .request(server)
      .get("/product/666997f87751454e6a595127")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        expect(res.body.data).should.be.a("object");
        done();
      });
  });

  it("Get product with ID (Bad Request)", (done) => {
    chai
      .request(server)
      .get("/product/df123hdfsh")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Add new product", (done) => {
    const data = {
      name: "Test",
      price: 10,
      image: "Test",
      description: "Test",
    };

    chai
      .request(server)
      .post("/product/add")
      .send(data)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        done();
      });
  });

  it("Add new product (Bad Request)", (done) => {
    const data = {
      image: "Test",
      description: "Test",
    };

    chai
      .request(server)
      .post("/product/add")
      .send(data)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Update a product info", (done) => {
    const data = {
      id: "6669c171ba9fcc5750e2068c",
      image: "updated",
      description: "product",
    };

    chai
      .request(server)
      .put("/product/update")
      .send(data)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("object");
        done();
      });
  });

  it("Update a product info (Bad Request)", (done) => {
    const data = {
      id: "dssdgsg1f1g1",
      image: 123,
    };

    chai
      .request(server)
      .put("/product/update")
      .send(data)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        res.body.data.should.be.a("string");
        done();
      });
  });

  it("Delete a product", (done) => {
    const data = {
      name: "Test",
      price: 10,
      image: "Test",
      description: "Test",
    };

    let id = "";

    chai
      .request(server)
      .post("/product/add")
      .send(data)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("object");

        id = res.body.data._id;

        chai
          .request(server)
          .delete("/product/delete")
          .send({ id })
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            expect(res.body.success).to.be.equal(true);
            res.body.data.should.be.a("object");
            done();
          });
      });
  });
});
