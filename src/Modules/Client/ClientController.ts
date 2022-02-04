import { Request, Response } from 'express';
import { IClientController } from './structure';


export class ClientController implements IClientController{
    
    async create(req: Request, res: Response): Promise<void> {

    }
}