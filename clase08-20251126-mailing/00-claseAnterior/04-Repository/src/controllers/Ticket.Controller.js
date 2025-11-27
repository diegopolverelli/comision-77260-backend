import { ticketService } from "../service/factory.js";


export const createTicket=async(req, res)=>{
    let {cid, products=[]}=req.body
    // validaciones varias... 
    if(!cid || !products || !Array.isArray(products)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete los datos de manera correcta`})
    }

    // resto validaciones / formateo de info, etc. 

    try {
        // let ticket="ticket"
        let ticket=await ticketService.createTicket(cid, products)

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({ticket});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
}