import { ClientController } from "./ClientController"
import request from 'supertest'
import { app } from "../../app";


const validateSut = () => {
    const sut = new ClientController()
    return sut
}

describe.only('test for ClientController', () => {

    // it('should validate cpf is valid', async () => {
    //     const sut = validateSut()
    //     Request.body = {
    //         "name": "Rafael",
    //         "cpf": '120557646089999',
    //         "email": "rafaelv.boscato@hotmail.com"
    //     }
    //     const result = await sut.create(Request,Response)
    //     expect(result).toEqual({message:"CPF invalido"})
    // })

    it.only('should validate email is valid', async () => {
        
        const user = await request(app)
        .post('/create')
        .send({
            name:'Rafael',
            cpf:"12055764608",
            email:'rafaelv.boscatohotmail.com'
        })
        expect(user.body.message).toBe('email inválido')

    })

})