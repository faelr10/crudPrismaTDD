import { prismaMock } from '../../database/singleton';
import { ClientService } from './ClientService';
import { ClientRepository } from './ClientRepository';
import { IClientRepository } from './structure';
import { Client } from '@prisma/client';

const createSut = () => {
    const clientRepositoryMock = createClientRepository()
    const sut = new ClientService(clientRepositoryMock)
    return sut
}

interface ICreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

const createClientRepository = () => {

    class ClientRepositoryMock implements IClientRepository {

        async create(data: ICreateUser): Promise<Client | Error> {
            const client = {
                id: '123456',
                name: data.name,
                cpf: data.cpf,
                email: data.email
            }
            return client
        }

        async getByClient(value: string, key?: string): Promise<Client | boolean> {

            const listClientMock = [{
                id: "123456",
                name: "Adriano",
                cpf: "10292199767",
                email: "adriano@adriano"
            }] 

            const verifiedCPF = listClientMock.find(listClientMock => listClientMock.cpf === value)
            const verifiedEmail = listClientMock.find(listClientMock => listClientMock.email === value)

            if(verifiedCPF){
                return {
                    id: "123456",
                    name: "Adriano",
                    cpf: "10292199767",
                    email: "adriano@adriano"
                }
            }else if(verifiedEmail){
                return {
                    id: "123456",
                    name: "Adriano",
                    cpf: "10292199767",
                    email: "adriano@adriano"
                }
            }
            else{
                return false
            }


        }

    }
    return new ClientRepositoryMock
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


})