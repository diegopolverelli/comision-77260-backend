import { usersModel } from "./models/usersModelo.js"


console.log("Persistencia en MongoDB iniciada")
// let archivo="./src/DAO/usuarios.json"

// function filtrar(arreglo, filtro){
//     let keysFiltro=Object.keys(filtro)
//     keysFiltro.forEach(prop=>{
//         arreglo=arreglo.filter(elem=>elem[prop]==filtro[prop]) 
//     })
//     return arreglo
// }

export class usuariosMongoDAO{
    constructor(){}

    async get(){
        // let usuarios=[]
        // if(fs.existsSync(archivo)){
        //     usuarios=JSON.parse(fs.readFileSync(archivo, "utf-8"))
        // }

        return await usersModel.find().lean()
    }

    async getBy(filtro={}){   // {nombre:"Juan"}
        // let usuarios=[]
        // if(fs.existsSync(archivo)){
        //     usuarios=JSON.parse(fs.readFileSync(archivo, "utf-8"))
        // }

        // usuarios=filtrar(usuarios, filtro)
        // if(usuarios.length===0){
        //     return null
        // }else{
        //     return usuarios[0]
        // }
        return await usersModel.findOne(filtro).lean()
    }

    async create(usuario){
        // let usuarios=this.get()
        // let _id=1
        // if(usuarios.length>0){
        //     _id=usuarios[usuarios.length-1]._id + 1
        // }

        // let usuarioNuevo={_id, ...usuario}

        // usuarios.push(usuarioNuevo)

        // fs.writeFileSync(archivo, JSON.stringify(usuarios,null,5))

        let nuevoUsuario=await usersModel.create(usuario)

        return nuevoUsuario.toJSON()
    }

    // update

    // delete
}