import { prismaMock } from '../../database/singleton';
import { ClientService } from './ClientService';
import { ClientRepository } from './ClientRepository';

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