import { Client } from "@prisma/client"
import { IClientRepository } from "./structure"

interface ICreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}


export class ClientRepositoryMock implements IClientRepository {

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

        if (verifiedCPF) {
            return {
                id: "123456",
                name: "Adriano",
                cpf: "10292199767",
                email: "adriano@adriano"
            }
        } else if (verifiedEmail) {
            return {
                id: "123456",
                name: "Adriano",
                cpf: "10292199767",
                email: "adriano@adriano"
            }
        }
        else {
            return false
        }
    }

    async findAll(): Promise<void | object[]> {
        const listClientMock = [{
            id: "123456",
            name: "Adriano",
            cpf: "10292199767",
            email: "adriano@adriano"
        }]
        return listClientMock
    }

}
