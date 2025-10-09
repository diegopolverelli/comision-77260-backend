import express from "express"
import { UsuariosManager } from "./dao/UsuariosManager.js"
import { logger } from "./middlewares/logger.js"
import { formatData } from "./middlewares/formatData.js"
import { auth } from "./middlewares/auth.js"

const PORT=3000

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger)

app.get("/", (req, res)=>{    // función handler o controller de la ruta home

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Home Page`});
})

app.get("/api/usuarios", async(req, res)=>{

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

app.get("/api/usuarios/:id", async(req, res)=>{

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

app.post("/api/usuarios", auth, formatData, async(req, res)=>{
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


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

