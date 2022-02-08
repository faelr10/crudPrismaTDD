import { prismaMock } from '../../database/singleton';
import { ClientService } from './ClientService';
import { ClientRepository } from './ClientRepository';
import { IClientRepository } from './structure';
import { Client } from '@prisma/client';
import { ClientRepositoryMock } from './ClientRepositoryMock';

const createSut = () => {
    const clientRepositoryMock = new ClientRepositoryMock()
    const sut = new ClientService(clientRepositoryMock)
    return sut
}

interface ICreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

describe('test client service', () => {

    it('test create service client', async () => {
        const sut = createSut()
        const client = {
            name: "Adriano",
            cpf: "10292199766",
            email: "oTalDoAdriano@adriano"
        }
        await expect(sut.create(client)).resolves.toHaveProperty('id')
    });

    it('should verified already exist CPF', async () => {
        const sut = createSut()
        const client = {
            name: "Adriano",
            cpf: "10292199767",
            email: "oTalDoAdriano@adriano"
        }
        await expect(sut.create(client)).resolves.toEqual({ message: 'CPF already exist!' })
    })

    it('should verified already exist Email', async () => {
        const sut = createSut()
        const client = {
            name: "Adriano",
            cpf: "10292199766",
            email: "adriano@adriano"
        }
        await expect(sut.create(client)).resolves.toEqual({ message: 'Email already exist!' })
    })

    it('should return all clients', async () => {
        const sut = createSut()
        const listClient = await sut.findAll()

        expect(listClient).toStrictEqual([{
            id: "123456",
            name: "Adriano",
            cpf: "10292199767",
            email: "adriano@adriano"
        }])
    })


})