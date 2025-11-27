export class ProductosRepository{
    constructor(dao){
        this.productosDAO=dao
    }

    async getproductos(){
        return this.productosDAO.get()
    }

    async getproductoById(id){
        let productos=await this.getproductos()
        let producto=productos.find(c=>c.id==id)
        return producto
    }

    async actuStock(id, stoct){
        let productos=await this.getproductos()
        let producto=productos.find(c=>c.id==id)
        producto.stock=stoct
        await this.productosDAO.update(id, producto)
        return producto
    }
}