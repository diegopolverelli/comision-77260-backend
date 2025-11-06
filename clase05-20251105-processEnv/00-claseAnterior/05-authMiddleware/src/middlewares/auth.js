import jwt from "jsonwebtoken"
// export const auth=(req, res, next)=>{
//     // if(!req.session.usuario){
//     //     res.setHeader('Content-Type','application/json');
//     //     return res.status(401).json({error:`No hay usuarios autenticados`})

//     //     return res.redirect("/login")  // login debe ser una vista (html) o contenido estático 
//     // }

//     // req.user=req.session.usuario

//     // if(!req.headers.authorization){
//     //     res.setHeader('Content-Type','application/json');
//     //     return res.status(401).json({error:`No hay usuarios autenticados`})
//     // }

//     if(!req.cookies.tokenCookie){
//         res.setHeader('Content-Type','application/json');
//         return res.status(401).json({error:`No hay usuarios autenticados`})
//     }

//     try {
//         // let token=req.headers.authorization.split(" ")[1]    // BEARER adsfasdf.asdfasdf9adsf8.asdfasdfasf
//         let token=req.cookies.tokenCookie
//         let usuario=jwt.verify(token, "CoderCoder123")
//         req.user=usuario
//     } catch (error) {
//         res.setHeader('Content-Type','application/json');
//         return res.status(401).json({error:`Credenciales invalidas`, error: error.message})
//     }


//     next()
// }


export const authAdmin=(req, res, next)=>{
    if(req.user.rol!="admin"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios suficientes`})
    }

    next()
}

export const authUser=(req, res, next)=>{
    if(req.user.rol!="user"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios suficientes`})
    }

    next()
}

export const auth=(permisos=[])=>{
    return (req, res, next)=>{
        if(!Array.isArray(permisos)){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Permisos de la ruta mal configurados. Contacte al administrador`})
        }

        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")){
            return next()
        }

        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios autenticados`})
        }

        if(!permisos.includes(req.user.rol.toLowerCase())){  // ["user", "ventas", "compras"]
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficentes para acceder al recurso solicitado`})
        }   
        
        return next()
    }
}


