import { MemoryClientesDAO as DAO } from "../dao/MemoryClientesDAO.js"

let clientesService=new DAO()

async function getClientes(req,res){

    let clientes=await clientesService.get()

    res.status(200).json({clientes})
}

export default {getClientes}