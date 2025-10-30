import jwt from "jsonwebtoken"
export const auth=(req, res, next)=>{
    // if(!req.session.usuario){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`No hay usuarios autenticados`})

    //     return res.redirect("/login")  // login debe ser una vista (html) o contenido estático 
    // }

    // req.user=req.session.usuario

    // if(!req.headers.authorization){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`No hay usuarios autenticados`})
    // }

    if(!req.cookies.tokenCookie){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    try {
        // let token=req.headers.authorization.split(" ")[1]    // BEARER adsfasdf.asdfasdf9adsf8.asdfasdfasf
        let token=req.cookies.tokenCookie
        let usuario=jwt.verify(token, "CoderCoder123")
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`, error: error.message})
    }


    next()
}