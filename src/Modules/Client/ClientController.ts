import { Request, Response } from 'express';
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
}