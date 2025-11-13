import { CustomRouter } from "./CustomRouter.js";

export class PetsRouter extends CustomRouter{
    init(){
        this.get("/", ["user", "admin"], (req, res)=>{

            if(req.query.error){
                throw new Error(`Error...!!!`)
            }

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:`Listado mascotas`});
            return res.success(`Listado mascotas`)
        })

        this.get(
            "/:id", 
            ["PUBLIC"],
            (req, res, next)=>{

                console.log(`Middleware prueba`)
                next()
            },
            (req, res)=>{


                // res.setHeader('Content-Type','application/json');
                // return res.status(200).json({payload:`Mascota id ${req.params.id}`});
                return res.success(`Mascota id ${req.params.id}`, {name:"Rocky", specie:"dog"})
            }
        )
    }
}