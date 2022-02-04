import { prismaMock } from './../../database/singleton';
import prisma from '../../database/client';


interface CreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

class ClientService {
    constructor(private clientRepository: ClientRepository) { }
    async create(data: CreateUser): Promise<object> {
        const result = await this.clientRepository.create(data)
        return result
    }
}

class ClientRepository {
    async create(data: CreateUser): Promise<object> {
        const newUser = await prisma.client.create({ data })
        return newUser
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
    })
})