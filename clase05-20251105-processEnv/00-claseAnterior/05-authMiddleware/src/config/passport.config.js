import passport from "passport"
import passportJWT from "passport-jwt"
import local from "passport-local"
import fs from "fs"
import bcrypt from "bcrypt"

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
                if(usuario.nombre=="Martin"){
                    return done(null, false, {message:`El usuario Martin, tiene temporalmente el acceso inhabilitado. Contacte a rrhh`})
                }
                return done(null, usuario)                
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email"
        }, 
        async function(username, password, done){
            try {
            
                let usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))
            
                let usuario=usuarios.find(u=>u.email===username)
                if(!usuario){
                    return done(null, false, {message:`credenciales inválidas...!!!`})
                } 
                
                if(!bcrypt.compareSync(password, usuario.password)){
                    return done(null, false, {message:`credenciales inválidas... :(`})
                }
            
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