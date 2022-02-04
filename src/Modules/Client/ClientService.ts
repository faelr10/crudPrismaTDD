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
        const verifiedCPF = await this.clientRepository.getByClient(data.cpf, 'cpf');

        if (verifiedCPF instanceof Error) {
            const result = await this.clientRepository.create(data)
            return result
        }
        return { message: `client alredy exist` }
    };
}