import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { auth, authAdmin, authUser } from './middlewares/auth.js';
import cookieParser from "cookie-parser"

import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import { passportCall } from './utils.js';

// process.loadEnvFile("./.env")

const PORT = 3000;

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// paso 2
initPassport()
app.use(passport.initialize())
// app.use(passport.session())  // solo si SESSIONS

app.get('/', (req, res) => {

    console.log(req.headers)

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send({ error: 'Ingrese todos los datos' })

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send({ error: `El usuario ${email} ya existe en la DB` })

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id,
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        rol: "user"
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

// app.post('/login', passport.authenticate("login", { session: false, }), (req, res) => {
app.post('/login', passportCall("login"), (req, res) => {


    let usuario = req.user

    delete usuario.password  // borrar datos sensibles
    let token = jwt.sign(usuario, "CoderCoder123", { expiresIn: "1h" })

    res.cookie("tokenCookie", token, { httpOnly: true })
    return res.status(200).json({
        usuarioLogueado: usuario,
        // token
    })

})

app.get("/error", (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    return res.status(401).json({ payload: `Unauthorized...!!!` });
})

// app.get('/usuario', auth, (req,res)=>{
// app.get('/usuario', passport.authenticate("current", { session: false, }), (req, res) => {
// app.get('/usuario', passportCall("current"), authUser, (req, res) => {
app.get('/usuario', passportCall("current"), auth(["USER", "admin"]), (req, res) => {


    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.nombre,
    });
});

app.get('/public', passportCall("current"), auth(["PUBLIC"]), (req, res) => {


    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.nombre,
    });
});

// app.get('/admin', passportCall("current"), authAdmin, (req, res) => {
app.get('/admin', passportCall("current"), auth(["admin", "manager"]), (req, res) => {


    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.nombre,
    });
});

app.get('/protected', function (req, res, next) {
    passport.authenticate('current', function (err, user, info, status) {
        if (err) { return next(err) }   // return done(error)
        if (!user) {
            // return res.redirect('/signin')
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`${info.message?info.message:info.toString()}`})
        }   // return done(null, false)
        res.status(200).json({message:`Datos de ${user.nombre}`});   // return done(null, usuario)
    })(req, res, next);
},);

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
