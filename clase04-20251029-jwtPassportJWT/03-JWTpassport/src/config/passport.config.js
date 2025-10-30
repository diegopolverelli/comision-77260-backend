import passport from "passport"
import passportJWT from "passport-jwt"

const buscarToken=req=>{
    let token=null

    if(req.cookies.tokenCookie){
        token=req.cookies.tokenCookie
    }

    return token
}

export const initPassport=()=>{

    // paso 1
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123", 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        }, 
        async(usuario, done)=>{
            try {
                return done(null, usuario)                
            } catch (error) {
                return done(error)
            }
        }
    ))


    // paso 1' SOLO SI SESSIONS
    // passport.serializeUser()
    // passport.deserializeUser()

}