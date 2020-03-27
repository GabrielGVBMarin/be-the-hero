const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    // afterEach()
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ong', async () => {
        const response = await request(app).post('/ongs')
        // .set('Authorization', 'valor')
        .send({
            name: "teste",
            email: "teste@gmail.com",
            whatsapp: "1122223333",
            city: "São Paulo",
            uf: "CE"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});
