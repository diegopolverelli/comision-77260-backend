export class TicketService{
    constructor(
        clientesRepository, 
        productosRepository, 
        ticketRepository,
    ){
        this.clientesRepository=clientesRepository
        this.productosRepository=productosRepository
        this.ticketRepository=ticketRepository
    }

    async createTicket(cid, productos=[]){
        let error=false
        let detalleError=[]
        let total=0

        // validar cliente

        // productos.forEach(async(p)=>{
        //     await this.clientesRepository
        // })


        for(let i=0; i<productos.length; i++){
            let pid=productos[i].id
            let cantidad=productos[i].cantidad

            let producto=await this.productosRepository.getproductoById(pid)
            if(!producto || producto.stock<cantidad){
                error=true
                detalleError.push(`Problemas con el producto id ${pid}`)
            }else{
                productos[i].descrip=producto.descrip
                productos[i].price=producto.price
                productos[i].subtotal=producto.price*cantidad
                total+=productos[i].subtotal
                console.log(await this.productosRepository.actuStock(pid, producto.stock-cantidad))
            }
        }

        if(error){
            return detalleError
        }

        let ticket=await this.ticketRepository.createTicket(
            {
                nroComp: Date.now(), 
                fecha: new Date().toLocaleString(),
                detalleCompra: productos, 
                total
            }
        )
        return ticket
    }
}