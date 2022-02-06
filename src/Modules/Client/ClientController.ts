import { Request, Response } from 'express';
import { IClientController } from './structure';


export class ClientController implements IClientController{
    

    async create(req:Request,res:Response): Promise<void> {

        const email:string = req.body.email

        if(!email.includes("@")){
            res.json({message:'email inválido'})
        }
        else{
            res.json({message:'ok'})
        }
         
    }
}