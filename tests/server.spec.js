const request = require("supertest");
const server = require("../index");

describe("CRUD", () => {
    it('GET Status 200, al obtener lista de cafes', async () => {
        const response = await request(server).get('/cafes').send();
        const status = response.statusCode;
        expect(status).toBe(200);
    });
   
    it('GET Status 404, Cuando no se encuentra un cafe', async () => {
        const { body: producto } = await request(server).get('/cafes/10').send();
        expect(producto).toBeInstanceOf(Object);
    })

    it('POST Status 201, Usuario crea un nuevo cafe', async () => {
        const id = new Date().getTime();
        const cafe = {
            id,
            nombre: "Vanilla Latte"
        };
        const { body: productos } = await request(server).post('/cafes').send(cafe);
        expect(productos).toContainEqual(cafe);
    });

    it('PUT Status 400 , Cuando id del request no coincide con el id del body', async () => { 
        const cafe = {
            id: 2,
            nombre: "Vanilla Latte"
        };
        const { body: response } = await request(server).put('/cafes/1').send(cafe);
        expect(response).toBeInstanceOf(Object);
    });
});