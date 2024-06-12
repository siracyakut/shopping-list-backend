const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
const server = require("../index");

chai.use(chaiHttp);

const email = `${(Math.random() + 1).toString(36).substring(7)}@siracyakut.com`;

describe("Authentication", async () => {
  it("Register a new user", (done) => {
    const user = {
      email,
      password: "123456Sirac!",
      name: "sirac",
      surname: "yakut",
    };

    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        done();
      });
  });

  it("Register with bad request", (done) => {
    const user = {
      email,
      name: 123,
      surname: "yakut",
    };

    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Login to user account", (done) => {
    const user = {
      email: "darkcik@sirac.com",
      password: "123456Sirac!",
    };

    chai
      .request(server)
      .post("/auth/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(true);
        done();
      });
  });

  it("Login with invalid credentials", (done) => {
    const user = {
      email: "asdasda@asdasdasasdasdas.com",
      password: "123456Sirac!",
    };

    chai
      .request(server)
      .post("/auth/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Login with bad request", (done) => {
    const user = {
      pass: "1",
    };

    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("Get authentication info", (done) => {
    const user = {
      email: "darkcik@sirac.com",
      password: "123456Sirac!",
    };

    chai
      .request(server)
      .post("/auth/login")
      .send(user)
      .end((err, res) => {
        const token = res.body.data.token;

        chai
          .request(server)
          .get("/auth/check")
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            expect(res.body.success).to.be.equal(true);
            done();
          });
      });
  });

  it("Get authentication info without token", (done) => {
    chai
      .request(server)
      .get("/auth/check")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });
});
