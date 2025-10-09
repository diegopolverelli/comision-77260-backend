import express from "express"
import { UsuariosManager } from "./dao/UsuariosManager.js"
import { logger } from "./middlewares/logger.js"
import { formatData } from "./middlewares/formatData.js"
import { auth } from "./middlewares/auth.js"

import { router as usuariosRouter } from "./routes/usuariosRouter.js"
import { router as clientesRouter } from "./routes/clientesRouter.js"

const PORT=3000

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger)

app.use("/api/usuarios", usuariosRouter)
app.use("/api/clientes", clientesRouter)

app.get("/", (req, res)=>{    // función handler o controller de la ruta home

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Home Page`});
})



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

