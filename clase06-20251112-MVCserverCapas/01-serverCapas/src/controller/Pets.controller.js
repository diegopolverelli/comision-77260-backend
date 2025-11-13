// import { PetsDAO } from "../dao/PetsDAO.js"
import { PetsMongoDAO as PetsDAO } from "../dao/PetsMongoDAO.js"

export const getPets=async(req,res)=>{

    try {
        
        // formateo de datos
        // validaciones
    
    
        // get data de la DB
        let pets=await PetsDAO.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({pets})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
}

export const createPet=async(req, res)=>{
    let {name, specie, birthDate}=req.body
    if(!name || !specie){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`name | specie son requeridos`})
    }

    // validaciones
    // formateo de datos.... 
    // lógica de negocio
    
    try {
        let newPet=await PetsDAO.save({name, specie, birthDate})

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:newPet});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
}


