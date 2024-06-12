const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
const server = require("../index");

chai.use(chaiHttp);

describe("Shopping Lists", () => {
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

  it("Get shopping list by ID", (done) => {
    chai
      .request(server)
      .get("/list/get/6669cd1a2a29a12c29802223")
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        expect(res.body.data).should.be.a("object");
        done();
      });
  });

  it("Get shopping list by ID (Bad Request)", (done) => {
    chai
      .request(server)
      .get("/list/get/sdgsdghasd12321")
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Get unauthorized shopping list", (done) => {
    chai
      .request(server)
      .get("/list/get/6668aaf132f59eb41e6da49c")
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        res.body.data.should.be.a("string");
        done();
      });
  });

  it("Add new shopping list", (done) => {
    const data = {
      name: "Test List",
    };

    chai
      .request(server)
      .post("/list/create")
      .send(data)
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("object");
        done();
      });
  });

  it("Add new shopping list (Bad Request)", (done) => {
    const data = {
      name: 123123123,
    };

    chai
      .request(server)
      .post("/list/create")
      .send(data)
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Update a shopping list", (done) => {
    const data = {
      listId: "6669cd1a2a29a12c29802223",
      name: "new list name",
      products: [123, 456],
    };

    chai
      .request(server)
      .put("/list/update")
      .send(data)
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("object");
        done();
      });
  });

  it("Update a shopping list (Bad Request)", (done) => {
    const data = {
      name: 33333,
    };

    chai
      .request(server)
      .put("/list/update")
      .send(data)
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        res.body.data.should.be.a("string");
        done();
      });
  });

  it("Create, add items and delete a shopping list", (done) => {
    const data = {
      name: "Test List for Delete Action",
    };

    let id = "";

    chai
      .request(server)
      .post("/list/create")
      .send(data)
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        res.body.data.should.be.a("object");

        id = res.body.data._id;

        chai
          .request(server)
          .post("/list/add-item")
          .send({ listId: id, itemId: "123" })
          .set("Cookie", `token=${token}`)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            expect(res.body.success).to.be.equal(true);
            res.body.data.should.be.a("object");

            chai
              .request(server)
              .delete("/list/delete")
              .send({ listId: id })
              .set("Cookie", `token=${token}`)
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
});
