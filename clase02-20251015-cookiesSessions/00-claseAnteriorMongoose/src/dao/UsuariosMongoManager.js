// import { usuarios } from "../data/usuarios.js";

import { usuariosModelo } from "./models/UsersModel.js"

export class UsuariosMongoManager{
    // static color="verde"

    static async getUsers(){
        return await usuariosModelo.find().lean()
    }

    static async getUserBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }

    static async createUser(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }
}


