import prisma from '../../database/client';
import { Client } from '@prisma/client';
import { IClientRepository } from './structure';


interface CreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

export class ClientRepository implements IClientRepository{

    async create(data: CreateUser): Promise<Client|Error> {
        const newUser = await prisma.client.create({ data })
        return newUser
    };

    async getByClient(value: string, key?: string): Promise<Client | boolean> {

        let result
        
        if (key === 'email') {
            result = await prisma.client.findUnique({ where: { email: value } })
        } else if (key === 'cpf') {
            result = await prisma.client.findUnique({ where: { cpf: value } })
        } else {
            result = await prisma.client.findUnique({ where: { id: value } })
        }
        
        return false
    }

    async findAll():Promise<Array<object>|void>{
        const listClient = await prisma.client.findMany()
        return listClient
    }
}