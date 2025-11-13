import { UsersMongoDAO as UsersDAO } from "../dao/UsersMongoDAO.js";

export class UsersController{
    static async getUsers(req, res){
        try {
            let users=await UsersDAO.get()

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({users});
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Internal Server Error`})
        }
    }

    static async createUser(req, res){
        let {name, email}=req.body
        if(!name || !email){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`name | email son requeridos`})
        }

        // validaciones
        // formateo... etc. LOGICA DE NEGOCIO...

        try {
            let newUser=await UsersDAO.save({name, email})

            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:newUser});
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Internal Server Error`})
        }
    }
}