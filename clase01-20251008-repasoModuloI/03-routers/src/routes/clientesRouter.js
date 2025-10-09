import { Router } from 'express';
export const router=Router()

router.get('/',(req,res)=>{

    let datos="datos"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({datos})
})

router.get('/listar',(req,res)=>{

    let clientes="listado clientes"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({clientes})
})