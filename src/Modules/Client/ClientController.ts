import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { ClientRepository } from './ClientRepository';
import { ClientService } from './ClientService';
import { IClientController } from './structure';

export class ClientController implements IClientController{

    async create(req:Request,res:Response): Promise<void> {
        const email:string = req.body.email
        const cpf:string = req.body.cpf
        if(!email.includes("@")){
            res.json({message:'Email inválido'})
        }
        else if(cpf.length > 11 || cpf.length < 11){
            res.json({message:'CPF inválido!'})
        }
        else{
            res.json({message:'ok'})
        }
    }

    async findAll(req:Request,res:Response):Promise<void>{
        const clientRepository = new ClientRepository()
        const clientService = new ClientService(clientRepository)
        const listClient = await clientService.findAll()
        res.status(200).json(listClient)
    }

    async findById(req:Request,res:Response):Promise<void>{
        const {id} = req.params

        const test = id.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")
        console.log(test)

        if(id.length <=30 || id === undefined){
            res.json({message:'Id inválido!'})
        }else{
            res.json({message:'ok'})
        }
    }
}