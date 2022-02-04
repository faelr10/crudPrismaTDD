import { prismaMock } from './../../database/singleton';
import prisma from '../../database/client';
import { Client } from '@prisma/client';


interface CreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

class ClientService {
    constructor(private clientRepository: ClientRepository) { }
    async create(data: CreateUser): Promise<object> {
        const verifiedCPF = await this.clientRepository.getByClient(data.cpf, 'cpf');

        if (verifiedCPF instanceof Error) {
            const result = await this.clientRepository.create(data)
            return result
        }
        return { message: `client alredy exist`}
    };
}

class ClientRepository {
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

const createSut = () => {
    const clientRepositoryMock = createClientRepository()
    const sut = new ClientService(clientRepositoryMock)
    return sut
}
const createClientRepository = () => {
    class ClientRepositoryMock extends ClientRepository { }
    return new ClientRepositoryMock
}

describe('test client service', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('test create service client', async () => {
        const sut = createSut()
        const user = {
            id: '2154122',
            name: 'Adriano',
            cpf: '12547889965',
            email: 'Adriano@Adriano.com'
        }
        prismaMock.client.create.mockResolvedValue(user)
        await expect(sut.create(user)).resolves.toHaveProperty('id')
    });

    it('should verified already exist client', async () => {
        const sut = createSut()
        const user = {
            id: '2154122',
            name: 'Adriano',
            cpf: '12547889965',
            email: 'Adriano@Adriano.com'
        }
        prismaMock.client.findUnique.mockResolvedValue(user)
        await expect(sut.create(user)).resolves.toEqual({ message: 'client alredy exist' })

    })
})