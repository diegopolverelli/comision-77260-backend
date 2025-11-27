// import { MemoryClientesDAO } from "../dao/MemoryClientesDAO.js"

export class ClientesRepository{
    constructor(dao){
        this.clientesDAO=dao
    }

    async getClientes(){
        return this.clientesDAO.get()
    }

    async getClienteById(id){
        let clientes=await this.getClientes()
        let cliente=clientes.find(c=>c.id==id)
        return cliente
    }

    async actuCtaCte(id, importe){
        let clientes=await this.getClientes()
        let cliente=clientes.find(c=>c.id==id)
        cliente.ctaCte=cliente.ctaCte?cliente.ctaCte+=importe:importe        
        await this.clientesDAO.update(id, cliente)
        return cliente
    }
}

// export const clientesRepository=new ClientesRepository(new MemoryClientesDAO())