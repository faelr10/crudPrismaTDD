import { Router } from "express";
import { ClientController } from "../Modules/Client/ClientController";

const routes = Router();

const clientController = new ClientController()

routes.post('/create',(req,res)=>clientController.create(req,res))

export { routes };
