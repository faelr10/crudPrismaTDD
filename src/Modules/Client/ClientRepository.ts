import prisma from '../../database/client';
import { Client } from '@prisma/client';


interface CreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

export class ClientRepository {
    async create(data: CreateUser): Promise<object> {
        const newUser = await prisma.client.create({ data })
        return newUser
    };

    async getByClient(value: string, key?: string): Promise<Client | Error> {

        let result
        if (key === 'email') {
            result = await prisma.client.findUnique({ where: { email: value } })
        } else if (key === 'cpf') {
            result = await prisma.client.findUnique({ where: { cpf: value } })
        } else {
            result = await prisma.client.findUnique({ where: { id: value } })
        }
        if (!result) {
            return new Error('Usuario não encontrado.')
        }
        return result
    }
}