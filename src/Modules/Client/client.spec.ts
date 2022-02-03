
interface CreateUser {
    name: string
    cpf:string,
    email:string
}

class ClientService{
    constructor(private clientRepository:ClientRepository ){}
    async create(data:CreateUser):Promise<object>{
        const result = await this.clientRepository.create(data)
        return result
    }
}

class ClientRepository{
    async create(data:CreateUser):Promise<object>{
        const newData = {
            id:'123456',
            name:data.name,
            cpf:data.cpf,
            email:data.email
        }
        return newData
    }
}

const createSut = () => {
    const clientRepositoryMock = createClientRepository()
    const sut = new ClientService(clientRepositoryMock)
    return sut
}
 const createClientRepository = () => {
    class ClientRepositoryMock extends ClientRepository{}
    return new ClientRepositoryMock
}

describe('test client service',()=>{

    it('test create service client',async ()=>{
        const sut = createSut()
        const result = await sut.create({
            name:'Rafael',
            cpf:'12055764608',
            email:'rafaelv.boscato@hotmail.com'
        })
        expect(result).toHaveProperty('name','Rafael')
    })

})