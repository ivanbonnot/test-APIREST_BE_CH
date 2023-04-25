const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const request = supertest(`http://localhost:8080/api/productos`);

describe('GET /api/productos', () => {
    it('should return an array of products', (done) => {
        request.get('/')
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.be.eq(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});

describe('POST /api/productos', () => {

    it('should return status 200 and add a product', async () => {
   
        const response = await request.post('/').send({
            timestamp: "testTimestamp",
            title: "Producto de prueba",
            thumbnail: "testThumbnail",
            description: "testDescription",
            stock: 10,
            code: "testCode",
            price: 99.99,
        })

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.an('object');
    });
});






