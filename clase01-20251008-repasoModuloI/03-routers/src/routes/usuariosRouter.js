import {Router} from "express"
import { auth } from "../middlewares/auth.js"
import { formatData } from "../middlewares/formatData.js"
import { UsuariosManager } from "../dao/UsuariosManager.js"

export const router=Router()

// router.get()
// router.post()

router.get("/", async(req, res)=>{

    let {cantidad}=req.query

    try {
        let usuarios=await UsuariosManager.getUsers()
        if(cantidad){
            console.log(cantidad)
            usuarios=usuarios.slice(0, cantidad)
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({usuarios});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

})

router.get("/:id", async(req, res)=>{

    let {id}=req.params
    // validaciones
    id=Number(id)
    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un id numérico`})
    }
    // Array.isArray()

    try {
        let usuarios=await UsuariosManager.getUsers()
        let usuario=usuarios.find(u=>u.id==id)
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`No existe el usuario con id ${id}`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({usuario});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

})

router.get("/filtrar/:email", (req, res)=>{

    res.send("ruta filtro...!!!")
})

router.post("/", auth, formatData, async(req, res)=>{
    let {name, email}=req.body

    // validaciones
    if(!name || !email){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`name | email son requeridos`})
    }

    try {
        let nuevoUsuario=await UsuariosManager.createUser({name, email})
        
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload: `Usuario creado: ${name}`, nuevoUsuario});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }
})
