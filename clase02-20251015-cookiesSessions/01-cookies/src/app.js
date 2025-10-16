import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("CoderCoder123"))
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get("/setcookies", (req, res)=>{

    let datos={
        name: "Juan", 
        theme: "Dark", 
        fontSize: "12"
    }

    res.cookie("cookie01", datos, {})
    res.cookie("cookie02vto", datos, {maxAge: 1000 * 10})
    res.cookie("cookie03vto", datos, {expires: new Date(2025, 11, 18)})
    res.cookie("cookie04vtoSigned", datos, {expires: new Date(2025, 11, 18), signed: true})
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"cookies seteadas...!!!"});
})

app.get("/getcookies", (req, res)=>{

    console.log(req.headers.cookie)

    let cookies=req.cookies
    let signedCookies=req.signedCookies

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        cookies,
        signedCookies
    }});
})


app.get("/delcookies", (req, res)=>{
    

    // res.clearCookie("cookie03vto")
    let nombreCookies=Object.keys(req.cookies)
    nombreCookies.forEach(n=>res.clearCookie(n))
    nombreCookies=Object.keys(req.signedCookies)
    nombreCookies.forEach(n=>res.clearCookie(n))

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas!!!"});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
