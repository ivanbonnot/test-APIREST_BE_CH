const chai = require("chai");
const expect = chai.expect;
const supertest = require("supertest");
const request = supertest(`http://localhost:8080/api/productos`);

const idProd = "64471d0f41735c33b9e9d194";
const idProdToDelete = "64483e1505cf27689b01bce2";
const idFake = "64471ebac33e0842bca999b9";

describe("GET /api/productos", () => {
  it("should return an array of products", (done) => {
    request
      .get("/")
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.be.eq(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET by id /api/productos/id", () => {
  it("should return status 200 and a product ID", (done) => {
    request
      .get(`/${idProd}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.be.eq(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return status 404 because the product dont exist", (done) => {
    request
      .get(`/${idFake}`)
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.be.eq(404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("POST /api/productos", () => {
  it("should return status 200 and add a product", async () => {
    const response = await request.post("/").send({
      title: "Producto de prueba",
      thumbnail: "testThumbnail",
      description: "testDescription",
      stock: 10,
      code: "testCode",
      price: 99.99,
    });

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.an("object");
  });
});

describe("PUT /api/productos/id", () => {
  it("should return status 200 and update a product", async () => {
    const response = await request.put(`/${idProd}`).send({
      title: "Producto de actualizado",
      thumbnail: "updateThumbnail",
      description: "updateDescription",
      stock: 9,
      code: "updateCode",
      price: 90,
    });

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.an("object");
  });

  it("should return status 404 because the product to update dont exist", async () => {
    const response = await request.put(`/${idFake}`).send({
      title: "Producto de actualizado",
      thumbnail: "updateThumbnail",
      description: "updateDescription",
      stock: 9,
      code: "updateCode",
      price: 90,
    });

    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.an("object");
  });
});

describe("DELETE /api/productos/id", () => {
  it("should return status 200 and delete the product", async () => {
    const response = await request.delete(`/${idProdToDelete}`);
    expect(response.status).to.be.eq(200);
  });

  it("should return status 404 because the product to delete dont exist", async () => {
    const response = await request.delete(`/${idFake}`);
    expect(response.status).to.be.eq(404);
  });
});
