import {Router} from "express"
export class CustomRouter{

    #router
    constructor(){
        this.#router=Router()
        this.init()
    }

    init(){}


    getRouter(){  // ... son el operador rest
        return this.#router
    }

        //      getRouter("/datos", (req, res, next)=>{}, (req, res)=>{})
    get(ruta, permisos=[], ...funciones){
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.get(ruta, this.customResponses, this.accesos(permisos), this.manejaErrores(funciones))
    }

    manejaErrores(funciones=[]){     // [(req, res, next)=>{}, (req, res, next)=>{}, (req, res)=>{}]
        return funciones.map(fn=>{
            return async(...args)=>{   // ... op rest
                try {
                    return await fn(...args)   // ... son el op spread
                } catch (error) {
                    // return args[1].status(500).json({message:"Internal Server Error"})
                    return args[1].internalServerError(error.message)
                }
            }
        })
    }


    accesos(permisos=[]){
        return (req, res, next)=>{
            // valido permisos
            console.log(`${req.url} habilitada para roles ${JSON.stringify(permisos)}`)

            next()
        }
    }


    customResponses(req, res, next){
        res.success=(message, data=[])=>res.status(200).json({status:"OK", message, data})
        res.badRequest=(error)=>res.status(400).json({status:"BadRequest", error})
        res.internalServerError=(error)=>res.status(500).json({status:"InternalServerError", error})

        next()
    }

}

// const petsRouter=new CustomRouter()
// petsRouter.getRouter()
