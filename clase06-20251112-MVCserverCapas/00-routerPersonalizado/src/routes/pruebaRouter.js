import { Router } from 'express';
import { controllerHandler, midd01, midd02, midd03 } from '../middlewares/middlewares.js';
export const router=Router()

router.get('/',(req,res)=>{

    let texto="Pruebas router"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({texto})
})

const funciones=[midd01, midd02, midd03, controllerHandler]


router.get("/datos", funciones)