import { Router } from 'express';
export const router=Router()

router.get('/',(req,res)=>{

    let productos="productos"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({productos})
})