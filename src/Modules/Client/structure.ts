import { Client } from "@prisma/client";
import { Request, Response } from "express";

interface ICreateUser {
    id?: string
    name: string
    cpf: string,
    email: string
}

export interface IClientController{
    create(req:Request,res:Response):Promise<void>
}

export interface IClientService{
    create(data:ICreateUser):Promise<object|Error>
}

export interface IClientRepository{
    create(data:ICreateUser):Promise<Client|Error>
    getByClient(value:string,key?:string):Promise<Client|Error>
}