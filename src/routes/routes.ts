import { Router } from "express";
import { ClientController } from "../Modules/Client/ClientController";

const routes = Router();

const clientController = new ClientController()

routes.post('/create',(req,res)=>clientController.create(req,res))
routes.get('/findAll',(req,res)=>clientController.findAll(req,res))
routes.get('/findById/:id',(req,res)=>clientController.findById(req,res))


export { routes };
