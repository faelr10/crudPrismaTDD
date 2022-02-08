import { ClientRepository } from "./ClientRepository";
import { IClientService } from "./structure";


interface CreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

export class ClientService implements IClientService {

    constructor(private clientRepository: ClientRepository) { }
     
    async create(data: CreateUser): Promise<object> {
        
        const verifiedCPF = await this.clientRepository.getByClient(data.cpf,'cpf')
        const verifiedEmail = await this.clientRepository.getByClient(data.email,'email')

        if(verifiedCPF){
            return {message:'CPF already exist!'}
        }else if(verifiedEmail){
            return {message:'Email already exist!'}
        }
        else{
            const client = this.clientRepository.create(data)
            return client
        }
    };

    async findAll():Promise<Array<object>|void>{
        const listClient = await this.clientRepository.findAll()
        return listClient
    }
}