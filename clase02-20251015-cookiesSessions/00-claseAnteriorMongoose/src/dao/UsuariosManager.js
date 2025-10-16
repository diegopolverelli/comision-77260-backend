import { usuarios } from "../data/usuarios.js";

export class UsuariosManager{
    // static color="verde"

    static async getUsers(){
        return usuarios
    }

    static async createUser(usuario){
        let id=1
        if(usuarios.length>0){
            id=Math.max(...usuarios.map(d=>d.id))+1
        }

        let nuevoUsuario={
            id, 
            ...usuario  // los ... son aquí el operador spread
        }

        usuarios.push(nuevoUsuario)

        return nuevoUsuario
    }
}


