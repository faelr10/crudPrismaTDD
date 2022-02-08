import { ClientController } from "./ClientController"
import request from 'supertest'
import { app } from "../../app";


const validateSut = () => {
    const sut = new ClientController()
    return sut
}

describe.only('test for ClientController', () => {

    it('should validate cpf is valid', async () => {
        const client = await request(app)
            .post('/create')
            .send({
                name: 'Rafael',
                cpf: '1205576460855',
                email: 'rafaelv.boscato@hotmail.com'
            })
        expect(client.body.message).toBe('CPF inválido!')
    })

    it('should validate email is valid', async () => {
        const user = await request(app)
            .post('/create')
            .send({
                name: 'Rafael',
                cpf: "12055764608",
                email: 'rafaelv.boscatohotmail.com'
            })
        expect(user.body.message).toBe('Email inválido')
    })

    it('should validate id request', async () => {
        const user = await request(app)
            .get('/findById/123')
        expect(user.body.message).toBe("Id inválido!")
    })


})